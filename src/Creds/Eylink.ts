
import { AccountData, AccountManager } from "../CredsInterface";
import { AccountManagerBase } from "../CredsManagerBase";


//key路由器
export class EylinkCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:EylinkAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'gtapi.xiaoerchaoren.com',
        port     : 8932,
        useAgent : false,
    };
}
/**APIKey值 */
export type EylinkAccount = AccountData;
