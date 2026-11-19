import { create } from 'zustand';

/**
 * 演示用计数仓库（zustand 版，功能与 vue3 脚手架的 Pinia 仓库一致）
 * - state：count 计数值
 * - getters：组件中用 selectDoubleCount 选择器获取派生的双倍值
 * - actions：increment / decrement / reset
 */
export const useDemoStore = create((set) => ({
  // 计数值
  count: 0,
  /**
   * 计数加一
   */
  increment: () => set((state) => ({ count: state.count + 1 })),
  /**
   * 计数减一
   */
  decrement: () => set((state) => ({ count: state.count - 1 })),
  /**
   * 计数重置为 0
   */
  reset: () => set({ count: 0 }),
}));

// 派生值（对应 getters）：组件中以选择器方式获取，count 变化时自动更新
export const selectDoubleCount = (state) => state.count * 2;
