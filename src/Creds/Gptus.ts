
import { AccountData, AccountManager } from "../CredsInterface";
import { AccountManagerBase } from "../CredsAdapterBase";


//key路由器
export class GptusCredsManager extends AccountManagerBase implements AccountManager{
    /** 构造函数 */
    constructor(accountTable:GptusAccount){
        super(accountTable);
    }
    postOption={
        hostname : 'www.gptapi.us',
        port     : 443,
        useAgent : false,
    };
}

/**APIKey值 */
export type GptusAccount = AccountData;