import request from '../utils/request';

/**
 * 获取安全用户列表（演示接口，与 vue3 脚手架保持一致）
 * @param {Object} data 请求参数
 * @returns {Promise} 请求结果
 */
export function getSecurityUser(data) {
  return request({
    url: '/role/getSecurityUser',
    method: 'POST',
    data,
  });
}
