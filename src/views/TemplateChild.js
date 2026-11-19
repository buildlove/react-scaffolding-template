import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Tag } from 'antd';

/**
 * 嵌套路由子路由页面
 * 与 vue3 脚手架的 template-child.vue 保持一致
 */
function TemplateChild() {
  const navigate = useNavigate();

  return (
    // 嵌套路由子路由页面
    <div className="page">
      <Card
        className="page-card"
        title="🧩 嵌套路由子路由"
        extra={<Tag color="success">子路由</Tag>}
      >
        <p className="page-desc">
          当前页面由二级子路由渲染，演示嵌套路由出口能力（外层布局 + 内层侧边菜单 + 子页面）。
        </p>
        <Button type="primary" onClick={() => navigate('/template/template1')}>
          返回首页
        </Button>
      </Card>
    </div>
  );
}

export default TemplateChild;
