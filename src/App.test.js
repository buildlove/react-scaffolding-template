import { render, screen } from '@testing-library/react';
import App from './App';

// 用例：验证脚手架标题文案能够正常渲染
test('renders scaffold title', () => {
  // 渲染 App 组件
  render(<App />);
  // 查找页面中的脚手架名称文案
  const titleElement = screen.getByText(/react18-scaffolding-template/i);
  // 断言文案已渲染到页面中
  expect(titleElement).toBeInTheDocument();
});
