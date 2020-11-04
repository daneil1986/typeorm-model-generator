/**
 * [自定义 业务状态码]
 *
 * @return  {[enum]}
 */
export enum ApiErrorCode {
  USER_ID_INVALID = 10001, // 用户id无效
  LOGIN_EXPIRED = 10009, // 登录过期
  PARAM_ERROR = 10002, // 参数错误
  NOT_LOGIN = 10003,
  CHANGE_UID_FAIL = 10004
}