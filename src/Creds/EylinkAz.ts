
import { AccountData, AccountManager } from "../CredsInterface";
import { AccountManagerBase } from "../CredsAdapterBase";


//key路由器
export class EylinkAzCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:EylinkAzAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'az.yesapikey.com',
        port     : 443,
        useAgent : false,
        protocol : 'https' as const
    };
}

/**APIKey值 */
export type EylinkAzAccount = AccountData;
