
import { AccountData, AccountManager } from "../CredsInterface";
import { AccountManagerBase } from "../CredsManagerBase";


//key路由器
export class Eylink4CredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:Eylink4Account){
        super(accountTable);
    }
    postOption={
        hostname : '15.204.101.64',
        port     : 4000,
        useAgent : false,
        protocol : 'http' as const
    };
    //postOption={
    //    hostname : 'gtfast.xiaoerchaoren.com',
    //    port     : 8937,
    //    useAgent : false,
    //};
    //gtapi.xiaoerchaoren.com:8932

    //https://gtfast.xiaoerchaoren.com:8937
    //http://gtfast.xiaoerchaoren.com:8930
    //15.204.101.64:4000
}

/**APIKey值 */
export type Eylink4Account = AccountData;