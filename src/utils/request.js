import axios from 'axios';
import { message } from 'antd';

// 创建 axios 实例（与 vue3 脚手架的请求封装保持一致）
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // 接口域名，从环境变量注入
  withCredentials: true, // 跨域请求时携带 cookie
  timeout: Infinity, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.headers) config.headers = {};
    return config;
  },
  (error) => Promise.reject(error) // 请求错误直接抛出
);

// 响应拦截器：统一处理业务错误
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && res.code && res.code !== '200') {
      // 业务错误码：统一弹出错误提示
      message.error(res.message || res.msg || '请检查数据返回格式');
      return Promise.reject(res.message || 'error');
    }
    return res;
  },
  (error) => {
    // 网络/HTTP 错误：统一弹出错误提示
    message.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
