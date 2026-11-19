const { addBabelPlugin } = require('customize-cra');

module.exports = {
  // antd v5 使用 CSS-in-JS 无样式文件可按需引入，style 必须为 false（v5 不再提供 style 目录）
  addAntdBabelPlugin: addBabelPlugin(['import', { libraryName: 'antd', style: false }, 'antd']),
  addBcdBabelPlugin: addBabelPlugin([
    'import',
    { libraryName: '@leonwerth/basic-components', style: false, camel2DashComponentName: false, libraryDirectory: 'es' },
    'basic-components',
  ]),
  addVidcBabelPlugin: addBabelPlugin([
    'import',
    { libraryName: '@leonwerth/vidc', style: false, camel2DashComponentName: false, libraryDirectory: 'es' },
    'video-cloud-components',
  ]),
  addMapdBabelPlugin: addBabelPlugin(['import', { libraryName: '@leonwerth/util-map', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'map-components']),
  addAhooksBabelPlugin: addBabelPlugin(['import', { libraryName: 'ahooks', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'ahooks']),
  addUtilsBabelPlugin: addBabelPlugin(['import', { libraryName: '@leonwerth/utils', style: false, camel2DashComponentName: false, libraryDirectory: 'es' }, 'utils']),
};
