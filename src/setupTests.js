// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom 未实现 window.matchMedia，而 antd 的响应式观察器依赖该 API，
// 这里补充 mock，保证引入 antd 组件的用例可以正常渲染
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    // 以下为已废弃 API 的占位实现，保持 antd 兼容
    addListener: jest.fn(),
    removeListener: jest.fn(),
    // 以下为标准事件 API
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});
