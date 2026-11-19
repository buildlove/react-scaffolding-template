import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import AppRoutes from './router';
import './index.less';

/**
 * 根组件：全局配置（Ant Design 中文语言包）+ Hash 路由
 * 与 vue3 脚手架的 App.vue（el-config-provider 中文语言包）保持一致
 */
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
