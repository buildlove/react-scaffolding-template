import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { findMetaByPath } from '../router/routesMeta';
import './Layout.less';

// 顶部导航配置：active 为该导航对应的路由完整路径（用于精确高亮）
const navList = [
  { label: '嵌套路由', path: '/template', active: '/template/template1' },
  { label: '二级子路由', path: '/template/templateChild', active: '/template/templateChild' },
  { label: '独立路由', path: '/template2', active: '/template2' },
];

/**
 * 将日期格式化为 YYYY-MM-DD HH:mm:ss
 * @param {Date} date 日期对象
 * @returns {string} 格式化后的时间字符串
 */
const formatTime = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

/**
 * 顶部导航布局：品牌 + 主导航 + 实时时钟 + 路由出口
 * 与 vue3 脚手架的 layout.vue 保持一致
 */
function Layout() {
  const location = useLocation();
  // 当前时间字符串
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));

  // 实时时钟：每秒刷新一次
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);
    // 卸载时清理定时器，避免内存泄漏
    return () => clearInterval(timer);
  }, []);

  // 根据路由 meta 更新浏览器标题（对齐 vue3 版的 afterEach 钩子）
  useEffect(() => {
    const meta = findMetaByPath(location.pathname);
    document.title = '模版' + (meta?.name ? `-${meta.name}` : '');
  }, [location.pathname]);

  return (
    // 整体布局容器：顶部导航 + 主内容区
    <div className="layouts">
      {/* 顶部导航栏 */}
      <header className="layouts-header">
        {/* 品牌区：Logo 与项目名称 */}
        <div className="layouts-brand">
          <div className="layouts-logo">R</div>
          <div className="layouts-name">
            <div className="layouts-title">React 脚手架演示</div>
            <div className="layouts-subtitle">React 19 · React Router · Zustand · Ant Design</div>
          </div>
        </div>

        {/* 主导航：与路由联动，自动高亮当前页面 */}
        <nav className="layouts-nav">
          {navList.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`layouts-nav-item${location.pathname === item.active ? ' is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 右侧实时时钟：演示定时器与组件卸载清理 */}
        <div className="layouts-clock">🕐 {currentTime}</div>
      </header>

      {/* 主内容区：一级路由出口 */}
      <div className="layouts-wrapper">
        <section className="layouts-main">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default Layout;
