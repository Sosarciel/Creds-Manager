
import { AccountManagerBase } from "../CredsAdapterBase";
import { AccountData, AccountManager } from "../CredsInterface";


//key路由器
export class GoogleCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:GoogleAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'generativelanguage.googleapis.com',
        port     : 443,
        useAgent : true,
    };
}

/**APIKey值 */
export type GoogleAccount = AccountData;