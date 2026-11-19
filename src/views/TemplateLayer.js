import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './TemplateLayer.less';

// 二级菜单配置（与 routesMeta.js 中 /template 路由的 children 对应）
const menuList = [
  { label: '嵌套路由一（首页）', path: '/template/template1' },
  { label: '嵌套路由子路由', path: '/template/templateChild' },
];

/**
 * 嵌套路由容器：左侧二级菜单 + 右侧嵌套路由出口
 * 与 vue3 脚手架的 template-layer.vue 保持一致
 */
function TemplateLayer() {
  const location = useLocation();

  return (
    <div className="layer">
      {/* 侧边二级菜单 */}
      <aside className="layer-menu">
        <div className="layer-menu-title">二级菜单</div>
        {menuList.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`layer-menu-item${location.pathname === item.path ? ' is-active' : ''}`}
          >
            <span className="layer-menu-dot" />
            {item.label}
          </Link>
        ))}
      </aside>

      {/* 二级路由出口 */}
      <div className="layer-content">
        <Outlet />
      </div>
    </div>
  );
}

export default TemplateLayer;
