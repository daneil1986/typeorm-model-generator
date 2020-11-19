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
  CHANGE_UID_FAIL = 10004,
  AVATAR_NO_LEGAL = 20001, // 头像不合规
  NAME_NO_LEGAL = 20002, // 昵称不合规
  AVATAR_NO_UPLOAD = 30001, // 头像未上传
  NAME_NO_INPUT = 30002, // 昵称未输入
  NAME_LENGTH_NO_MATCH = 30003, // 昵称长度不匹配
  GENDER_NO_INPUT = 30004, // 性别没有选择
  BIRTHDAY_NO_INPUT = 30005, // 生日没有选择
  GET_USERINFO_FAIL = 50001, // 获取用户信息失败
  NAME_CHECK_FAIL = 50002, // 昵称审核失败（接口出错）
  UPDATE_USERINFO_FAIL = 50003, // 更新用户信息失败
  BUY_ORDER_FAIL = 50004, // 下单失败
  UPDATE_AVATAR_FAIL = 50005, // 更新头像失败
  GET_MODULEINFO_FAIL = 50006, // 获取模块信息失败
  GET_SELLCOURSEINFO_FAIL = 50007, // 获取售卖信息失败,
  GET_COURSELIST_FAIL = 50008,
  INTERFAVE_CALL_FAIL = 50009,
  NETWORK_ERROR = 66666, // 服务器异常
}

// 异常errNo 与 errStr 对应关系
export const errNoAndErrStrMap = {
  20001: '头像不合规，请重新上传~',
  20002: '昵称不合规，请重新填写~',
  30001: '请先上传宝贝头像~',
  30002: '请先填写宝贝昵称~',
  30003: '请输入2-10个中文或英文~',
  30004: '请先选择宝贝性别~',
  30005: '请先选择宝贝生日~',
  50001: '获取用户信息失败~',
  50002: '昵称审核失败~', // 接口出异常
  50003: '更新用户信息失败~',
  50004: '下单失败~',
  50005: '更新头像失败~',
  50006: '获取模块信息失败',
  50007: '获取售卖课程信息失败',
  50008: '获取课程列表失败',
  50009: '接口调用失败',
  66666: '网络繁忙，请稍后重试~',
}
