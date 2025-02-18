import { AccountManagerBase } from "../CredsAdapterBase";
import { AccountData, AccountManager } from "../CredsInterface";
import {JObject} from '@zwa73/utils';

//key路由器
export class SiliconFlowCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:SiliconFlowAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'api.siliconflow.cn',
        port     : 443,
        useAgent : false,
    };
    procOption(option:JObject){
        const modelNameMap:Record<string,string>={
            "deepseek-chat":"deepseek-ai/DeepSeek-V3"
        };
        if('model' in option && typeof option.model === 'string'){
            const mapname = modelNameMap[option.model];
            if(mapname!=null)
                option.model = mapname as any;
        }
        return option;
    }
}

/**APIKey值 */
export type SiliconFlowAccount = AccountData;
