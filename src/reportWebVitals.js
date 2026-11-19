/**
 * 性能指标上报模块（适配 web-vitals v6 API）
 *
 * web-vitals v4 起 API 由 getXXX 改为 onXXX：
 * - onCLS  ：累计布局偏移（Cumulative Layout Shift）
 * - onINP  ：交互到下一次绘制（Interaction to Next Paint，v4 起替代已被移除的 FID）
 * - onFCP  ：首次内容绘制（First Contentful Paint）
 * - onLCP  ：最大内容绘制（Largest Contentful Paint）
 * - onTTFB ：首字节时间（Time to First Byte）
 *
 * @param {Function} onPerfEntry 性能指标回调函数，每项指标都会以指标对象作为入参回调
 */
const reportWebVitals = (onPerfEntry) => {
  // 仅在传入合法回调函数时，才动态加载 web-vitals，避免无意义的网络请求
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // 依次注册五项核心 Web 性能指标的监听
      onCLS(onPerfEntry); // 累计布局偏移
      onINP(onPerfEntry); // 交互响应（替代 FID）
      onFCP(onPerfEntry); // 首次内容绘制
      onLCP(onPerfEntry); // 最大内容绘制
      onTTFB(onPerfEntry); // 首字节时间
    });
  }
};

export default reportWebVitals;
