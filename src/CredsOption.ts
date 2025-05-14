import { assertType } from "@zwa73/utils";
import { AccountPostOption } from "./CredsInterface";


/**Deepseek官方账号参数
 * https://platform.deepseek.com
 */
export const DeepseekOption = {
    hostname : 'api.deepseek.com',
    port     : 443,
    useAgent : false,
}
assertType<AccountPostOption>(DeepseekOption);

/**DoubleGPT账号参数  
 * https://doublegpt.io  
 */
export const DoubleGPTOption = {
    hostname : 'www.doublegpt.io',
    port     : 443,
    useAgent : true,
};
assertType<AccountPostOption>(DoubleGPTOption);

/**旧版Eylink账号参数  
 * https://eylink.cn  
 */
export const EylinkOption = {
    hostname : 'gtapi.xiaoerchaoren.com',
    port     : 8932,
    useAgent : false,
}
assertType<AccountPostOption>(EylinkOption);


/**新版Eylink账号参数  
 * https://eylink.cn  
 *   
 * https://gtfast.xiaoerchaoren.com:8937
 * http://gtfast.xiaoerchaoren.com:8930
 * 15.204.101.64:4000
 */
export const Eylink4Option = {
    //hostname : '15.204.101.64',
    hostname : 'api.yesapikey.com',
    //port     : 4000,
    port     : 443,
    useAgent : false,
    //protocol : 'http' as const
    protocol : 'https' as const
}
assertType<AccountPostOption>(Eylink4Option);

/**Eylink az转发 账号参数  
 * https://eylink.cn  
 */
export const EylinkAzOption = {
    hostname : 'az.yesapikey.com',
    port     : 443,
    useAgent : false,
    protocol : 'https' as const
}
assertType<AccountPostOption>(EylinkAzOption);

/**谷歌官方账号参数  
 * https://ai.google.dev/gemini-api/docs/  
 */
export const GoogleOption = {
    hostname : 'generativelanguage.googleapis.com',
    port     : 443,
    useAgent : true,
}
assertType<AccountPostOption>(GoogleOption);

/**Gptge账号参数  
 * https://api.gpt.ge  
 */
export const GptgeOption = {
    hostname : 'api.gpt.ge',
    port     : 443,
    useAgent : false,
}
assertType<AccountPostOption>(GptgeOption);

/**Gptus账号参数  
 * https://www.gptapi.us  
 * 很差  
 */
export const GptusOption = {
    hostname : 'www.gptapi.us',
    port     : 443,
    useAgent : false,
}
assertType<AccountPostOption>(GptusOption);

/**OpenAI账号参数  
 * https://openai.com  
 */
export const OpenAIOption = {
    hostname : 'api.openai.com',
    port     :  443,
    useAgent : true,
}
assertType<AccountPostOption>(OpenAIOption);

/**硅基流动账号参数  
 * https://cloud.siliconflow.cn  
 */
export const SiliconFlowOption = {
    hostname : 'api.siliconflow.cn',
    port     : 443,
    useAgent : false,
    modelNameMap :{
        "deepseek-chat":"deepseek-ai/DeepSeek-V3"
    }
}
assertType<AccountPostOption>(SiliconFlowOption);