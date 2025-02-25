
import { AccountData, AccountManager } from "../CredsInterface";
import { AccountManagerBase } from "../CredsManagerBase";


//key路由器
export class GptgeCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:GptgeAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'api.gpt.ge',
        port     : 443,
        useAgent : false,
    };
}

/**APIKey值 */
export type GptgeAccount = AccountData;