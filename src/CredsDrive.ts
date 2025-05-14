import { AccountManagerBase } from "./CredsManagerBase";
import { AccountData, AccountManager, AccountPostOption } from "./CredsInterface";

//key路由器
export class AccountManagerDrive extends AccountManagerBase implements AccountManager{
    postOption:AccountPostOption;
    /** 构造函数 */
    constructor(option:AccountPostOption,accountTable:AccountData){
        super(accountTable);
        this.postOption = option;
    }
}
