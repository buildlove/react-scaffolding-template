/**
 * 路由元信息树（纯数据，不引用任何组件，避免循环依赖）
 * 字段说明（与 vue3 脚手架的路由 meta 保持一致）：
 * - path：完整路由路径
 * - redirect：默认重定向地址
 * - element：页面组件键名（在 router/index.js 的 elementMap 中映射为真实组件）
 * - meta.level：层级；meta.name：名称；meta.node：是否叶子节点
 */
export const routesMeta = [
  {
    path: '/',
    redirect: '/template',
    element: 'Layout',
    children: [
      {
        path: '/template',
        redirect: '/template/template1',
        element: 'TemplateLayer',
        meta: { level: 0, name: '嵌套路由菜单' },
        children: [
          {
            path: '/template/template1',
            element: 'Template',
            meta: { level: 1, name: '嵌套路由一', node: true },
          },
          {
            path: '/template/templateChild',
            element: 'TemplateChild',
            meta: { level: 1, name: '嵌套路由子路由', node: true },
          },
        ],
      },
      {
        path: '/template2',
        element: 'Template2',
        meta: { level: 0, name: '模版路由二', node: true },
      },
    ],
  },
];

/**
 * 递归拍平路由树，收集所有节点
 * @param {Array} tree 路由树
 * @param {Array} result 结果数组
 * @returns {Array} 拍平后的节点数组
 */
export const flattenRoutes = (tree, result = []) => {
  tree.forEach((node) => {
    result.push(node);
    if (node?.children?.length) {
      flattenRoutes(node.children, result);
    }
  });
  return result;
};

/**
 * 根据完整路径查找路由 meta（用于浏览器标题联动）
 * @param {string} path 路由完整路径
 * @returns {Object|undefined} 匹配的 meta 对象
 */
export const findMetaByPath = (path) =>
  flattenRoutes(routesMeta).find((item) => item.path === path)?.meta;
