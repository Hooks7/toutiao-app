import request from '../utils/request'

/**
 *  登录方法
 * @param {*} 登录提交服务器的数据mobile,code
 */
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}
