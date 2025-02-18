import { AccountData, AccountManager } from "../CredsInterface";
import { AccountManagerBase } from "../CredsAdapterBase";


//key路由器
export class OpenAICredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:OpenAIAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'api.openai.com',
        port     :  443,
        useAgent : true,
    };
}

/**APIKey值 */
export type OpenAIAccount = AccountData;