import React, { useMemo, useState } from 'react';
import { Button, Card, Empty, Pagination, Tag } from 'antd';
import { useDemoStore, selectDoubleCount } from '../store/demo';
import { routesMeta, flattenRoutes } from '../router/routesMeta';
import './Template.less';

// 欢迎横幅标签列表
const heroTags = ['React 19', 'React Router 6', 'Zustand', 'Ant Design', 'CRA', 'Less'];

// 技术栈介绍数据（图标使用 emoji，避免额外图标依赖）
const techList = [
  { icon: '⚛️', name: 'React 19', desc: '组件化 UI 与 Hooks 特性' },
  { icon: '🚀', name: 'CRA + rewired', desc: '脚手架构建与配置覆盖' },
  { icon: '🧭', name: 'React Router 6', desc: '嵌套路由与动态路由能力' },
  { icon: '🐻', name: 'Zustand', desc: '轻量直观的状态管理方案' },
  { icon: '🎨', name: 'Ant Design', desc: '企业级 UI 组件库' },
  { icon: '🌐', name: 'Axios', desc: '统一请求封装与拦截器' },
];

/**
 * 首页：欢迎横幅 + 技术栈介绍 + 功能演示
 * 与 vue3 脚手架的 template.vue 保持一致
 */
function Template() {
  // 计数仓库（zustand）：修改后所有引用处自动更新
  const count = useDemoStore((state) => state.count);
  const doubleCount = useDemoStore(selectDoubleCount);
  const { increment, decrement, reset } = useDemoStore();

  // 分页参数：当前页码与每页条数
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  // 带 meta.name 的路由节点列表（演示递归处理树结构）
  const nodeList = useMemo(
    () => flattenRoutes(routesMeta).filter((item) => item?.meta?.name),
    []
  );

  // 当前页展示的节点（分页与列表真实联动）
  const pagedNodes = useMemo(() => {
    const start = (page - 1) * pageSize;
    return nodeList.slice(start, start + pageSize);
  }, [nodeList, page, pageSize]);

  return (
    // 首页：欢迎横幅 + 技术栈 + 功能演示
    <div className="home">
      {/* 欢迎横幅 */}
      <section className="home-hero">
        <h1 className="home-hero-title">👋 欢迎使用 React 脚手架</h1>
        <p className="home-hero-desc">
          开箱即用的 React 19 + CRA + Zustand + React Router + Ant Design 演示工程，
          覆盖嵌套路由、状态管理、请求封装等常用能力，可直接作为新项目的起步模板。
        </p>
        <div className="home-hero-tags">
          {heroTags.map((tag) => (
            <span key={tag} className="home-hero-tag">{tag}</span>
          ))}
        </div>
      </section>

      {/* 技术栈卡片 */}
      <section className="home-section">
        <h2 className="home-section-title">技术栈</h2>
        <div className="home-stack">
          {techList.map((tech) => (
            <div key={tech.name} className="home-stack-card">
              <div className="home-stack-icon">{tech.icon}</div>
              <div className="home-stack-name">{tech.name}</div>
              <div className="home-stack-desc">{tech.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 功能演示 */}
      <section className="home-section">
        <h2 className="home-section-title">功能演示</h2>
        <div className="home-demo">
          {/* Zustand 计数器演示 */}
          <Card
            className="home-demo-card"
            title="🐻 Zustand 状态管理"
            extra={<Tag color="success">实时联动</Tag>}
          >
            <div className="home-counter">
              {/* 计数值：修改后所有引用处自动更新 */}
              <div className="home-counter-num">{count}</div>
              {/* 选择器派生值 */}
              <div className="home-counter-tip">双倍值（派生状态）：{doubleCount}</div>
              <div className="home-counter-btns">
                <Button type="primary" onClick={increment}>+ 1</Button>
                <Button onClick={decrement}>- 1</Button>
                <Button type="primary" ghost onClick={reset}>重置</Button>
              </div>
            </div>
          </Card>

          {/* 路由节点 + 分页联动演示 */}
          <Card
            className="home-demo-card"
            title="🧭 路由节点（分页联动）"
            extra={<Tag>共 {nodeList.length} 个节点</Tag>}
          >
            {/* 当前页节点列表 */}
            <div className="home-nodes">
              {pagedNodes.map((item) => (
                <div key={item.path} className="home-node-item">
                  <Tag color={item.meta?.node ? 'processing' : 'default'}>
                    层级 {item.meta?.level ?? '-'}
                  </Tag>
                  <span className="home-node-name">{item.meta?.name || '未命名路由'}</span>
                </div>
              ))}
              {!pagedNodes.length && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无节点" />
              )}
            </div>
            {/* 分页器：与上方节点列表真实联动 */}
            <Pagination
              className="home-pagination"
              size="small"
              showTotal={(total) => `共 ${total} 条`}
              showSizeChanger
              pageSizeOptions={['2', '4', '6']}
              total={nodeList.length}
              current={page}
              pageSize={pageSize}
              onChange={(nextPage, nextSize) => {
                setPage(nextPage);
                setPageSize(nextSize);
              }}
            />
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Template;
