
import { AccountManagerBase } from "../CredsAdapterBase";
import { AccountData, AccountManager } from "../CredsInterface";


//key路由器
export class DeepseekCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:DeepseekAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'api.deepseek.com',
        port     : 443,
        useAgent : false,
    };
}

/**APIKey值 */
export type DeepseekAccount = AccountData;