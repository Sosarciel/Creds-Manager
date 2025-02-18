import { AwaitInited, None, SLogger, throwError } from "@zwa73/utils";
import { APIPrice, APIPriceResp, AccountManager, CredsType } from "./CredsInterface";
import { ServiceConfig, ServiceCtorTable2FullCfgTable, ServiceData, ServiceManager, ServiceManagerMainCfg } from "@zwa73/service-manager";
import {
    DeepseekAccount, DeepseekCredsManager, DoubleGPTAccount, DoubleGPTCredsManager,
    Eylink4Account, Eylink4CredsManager, EylinkAccount, EylinkAzAccount,
    EylinkAzCredsManager, EylinkCredsManager, GptgeAccount, GptgeCredsManager,
    GptusAccount, GptusCredsManager, OpenAIAccount, OpenAICredsManager,
    SiliconFlowAccount, SiliconFlowCredsManager
} from "./Creds";
import { GoogleAccount, GoogleCredsManager } from "./Creds/Google";



const CtorTable = {
    /**https://openai.com */
    OpenAI      : (table:OpenAIAccount)      =>new OpenAICredsManager       (table),
    /**https://doublegpt.io */
    DoubleGPT   : (table:DoubleGPTAccount)   =>new DoubleGPTCredsManager    (table),
    /**https://eylink.cn */
    Eylink      : (table:EylinkAccount)      =>new EylinkCredsManager       (table),
    /**https://eylink.cn */
    Eylink4     : (table:Eylink4Account)     =>new Eylink4CredsManager      (table),
    /**https://eylink.cn */
    EylinkAz    : (table:EylinkAzAccount)    =>new EylinkAzCredsManager     (table),
    /**https://www.gptapi.us */
    Gptus       : (table:GptusAccount)       =>new GptusCredsManager        (table),
    /**https://api.gpt.ge */
    Gptge       : (table:GptgeAccount)       =>new GptgeCredsManager        (table),
    /**https://platform.deepseek.com */
    Deepseek    : (table:DeepseekAccount)    =>new DeepseekCredsManager     (table),
    /**https://cloud.siliconflow.cn */
    SiliconFlow : (table:SiliconFlowAccount) =>new SiliconFlowCredsManager  (table),
    /**https://ai.google.dev/gemini-api/docs/ */
    Google      : (table:GoogleAccount)      =>new GoogleCredsManager       (table),
};
type CtorTable = typeof CtorTable;

export type CredsAdapterJsonTable = ServiceManagerMainCfg&{
    instance_table:{
        [key:string]:ServiceCtorTable2FullCfgTable<CtorTable,ServiceConfig>
    }
}

/**凭证数据 */
export type CredsData = ServiceData<CredsAdapter>;

/**credentials_manager 凭证管理器 需先调用init */
class _CredsAdapter extends ServiceManager<
    AccountManager,
    CtorTable
>{
    //#region 构造函数
    constructor(tablePath:string){
        super(tablePath,CtorTable);
        //自动保存
        this.autoSave(300);
    }
    /**自动保存定时器 */
    private _autoSaveTimer:undefined|NodeJS.Timeout;
    //#endregion
    /**按照优先级获取第一个有效账户
     * @param accountType - 账户类型 按优先级排列
     */
    @AwaitInited
    async getAvailableAccount(...accountType:CredsType[]){
        const ac = (await Promise.all(accountType
            .map(async t=>await this.getVaildService(
                sd=>sd.type===t && sd.instance.getData().is_available===true
            )))).flat();
        return ac.length>=1 ? ac[0] : None;
    }
    /**计费
     * @param accountData     - 账户数据对象
     * @param price           - API的调用价格
     * @param promptCount     - 输入/prompt_tokens
     * @param completionCount - 输出/completion_tokens
     */
    @AwaitInited
    async calcPrice(accountData:CredsData,price:APIPrice,usage:APIPriceResp){
        const promptCount = usage.prompt_cache_miss_tokens ?? usage.prompt_tokens;
        const cachedPromptCount = usage.prompt_cache_hit_tokens ?? 0;
        const completionCount = usage.completion_tokens;
        const totalPrice =
            (promptCount*price.promptPrice)+
            (completionCount*price.completionPrice)+
            (cachedPromptCount*(price.cacheHitPromptPrice??0));
        if(isNaN(totalPrice)){
            SLogger.error(`CredsAdapter.calcPrice 错误 无法计算价格`);
            SLogger.error(usage);
            return;
        }
        await accountData.instance.addPrice(totalPrice);
    }
    /**打印已使用的USD数量
     * @param accountData - 账户数据对象
     */
    @AwaitInited
    async currUsedUSD(accountData:CredsData){
        const credit = (accountData.instance.getData().used_credit??0)/1000;
        SLogger.info(`${accountData.type}: ${accountData.name} 当前理论使用量: ${credit} USD`);
    }

    //#region 保存
    /**自动保存设定 秒
     * @param time - 自动保存间隔
     */
    autoSave(time:number){
        const bot = this;
        if(time<10)//最低10秒
            time=10;

        if(this._autoSaveTimer!=null)
            clearInterval(this._autoSaveTimer);
        this._autoSaveTimer = setInterval(() => {
            void bot.save();
        }, time * 1000);
    }
    /**保存凭证数据 */
    async save(){
        await super.save();
        SLogger.info("CredsManager.save 完成保存");
    }
    //#endregion
}

/**credentials_manager 凭证管理器 */
export type CredsAdapter = _CredsAdapter&{init:(tablePath: string)=>void};
export const CredsAdapter = new Proxy({} as {ins?:_CredsAdapter}, {
    get(target, prop, receiver) {
        if (prop === 'init') {
            return (tablePath: string) => {
                if (target.ins==null)
                    target.ins = new _CredsAdapter(tablePath);
            };
        }
        if (target.ins==null) throwError("CredsAdapter 未初始化", 'error');
        return Reflect.get(target.ins, prop, receiver);
    }
}) as any as CredsAdapter;
