import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { routesMeta } from './routesMeta';
import Layout from '../views/Layout';
import TemplateLayer from '../views/TemplateLayer';
import Template from '../views/Template';
import Template2 from '../views/Template2';
import TemplateChild from '../views/TemplateChild';

// 页面组件映射表：元信息树通过字符串键引用组件，避免循环依赖
const elementMap = {
  Layout: <Layout />,
  TemplateLayer: <TemplateLayer />,
  Template: <Template />,
  Template2: <Template2 />,
  TemplateChild: <TemplateChild />,
};

/**
 * 把元信息树转换为 react-router 的嵌套路由配置
 * @param {Array} nodes 元信息节点数组
 * @param {string} parentPath 父级完整路径（用于计算相对路径）
 * @returns {Array} react-router 路由配置数组
 */
const buildRoutes = (nodes, parentPath = '') =>
  nodes.map((node) => {
    const { path, redirect, element, meta, children } = node;

    // react-router v6 嵌套路由使用相对路径：去掉父级路径前缀
    let routePath = path;
    if (path !== '/') {
      routePath = parentPath ? path.replace(`${parentPath}/`, '') : path.replace(/^\//, '');
    }

    // 子路由集合：配置了重定向时生成 index 重定向路由
    const childRoutes = [];
    if (redirect) {
      childRoutes.push({ index: true, element: <Navigate to={redirect} replace /> });
    }
    if (children?.length) {
      childRoutes.push(...buildRoutes(children, path));
    }

    return {
      path: routePath,
      element: elementMap[element],
      meta,
      ...(childRoutes.length ? { children: childRoutes } : {}),
    };
  });

/**
 * 应用路由出口组件：根据元信息树渲染嵌套路由
 * 与 vue3 脚手架的路由结构一致：Layout > (TemplateLayer > Template | TemplateChild) | Template2
 */
const AppRoutes = () => useRoutes(buildRoutes(routesMeta));

export default AppRoutes;
