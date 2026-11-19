import { render, screen } from '@testing-library/react';
import App from './App';

// 用例：默认路由重定向到首页，验证欢迎横幅正常渲染
test('renders home hero title', () => {
  // 渲染 App 组件
  render(<App />);
  // 查找首页欢迎横幅文案
  const titleElement = screen.getByText(/欢迎使用 React 脚手架/);
  // 断言文案已渲染到页面中
  expect(titleElement).toBeInTheDocument();
});
