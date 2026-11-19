import React, { useState } from 'react';
import { Button, Card, Tag } from 'antd';
import { getSecurityUser } from '../api';
import './Template2.less';

/**
 * 独立路由页：演示 Axios 请求封装
 * 与 vue3 脚手架的 template2.vue 保持一致
 */
function Template2() {
  // 请求加载状态：控制按钮 loading 效果
  const [loading, setLoading] = useState(false);
  // 请求结果文本：展示接口返回或错误信息
  const [resultText, setResultText] = useState('');

  /**
   * 发送演示请求并展示结果
   * 成功时以 JSON 格式展示返回数据，失败时展示错误信息
   */
  const handleRequest = async () => {
    setLoading(true);
    setResultText('');
    try {
      const res = await getSecurityUser();
      setResultText(JSON.stringify(res, null, 2));
    } catch (error) {
      // 兼容业务错误（拦截器 reject 字符串）与网络错误（Error 对象）
      setResultText(`请求失败：${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 独立路由页：演示 Axios 请求封装
    <div className="page">
      <Card
        className="page-card"
        title="🌐 Axios 请求演示"
        extra={<Tag color="warning">独立路由</Tag>}
      >
        <p className="page-desc">
          点击按钮发起请求（统一请求封装见 src/utils/request.js，含拦截器与统一错误提示）。
        </p>
        <Button type="primary" loading={loading} onClick={handleRequest}>
          发送请求
        </Button>
        {/* 请求结果展示区：成功输出 JSON，失败输出错误信息 */}
        {resultText ? <div className="page-result">{resultText}</div> : null}
      </Card>
    </div>
  );
}

export default Template2;
