
import { AccountManagerBase } from "../CredsAdapterBase";
import { AccountData, AccountManager } from "../CredsInterface";


//key路由器
export class DoubleGPTCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:DoubleGPTAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'www.doublegpt.io',
        port     : 443,
        useAgent : true,
    };
}

/**APIKey值 */
export type DoubleGPTAccount = AccountData;