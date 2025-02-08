import { Store } from "@yoki/core";

type CountState = { count: number };

// 拆分不同的状态操作
const createBasicCountActions = (state: CountState) => ({
  increase: () => ({ count: state.count + 1 }),
  decrease: () => ({ count: state.count - 1 }),
});

const createAdvancedCountActions = (state: CountState) => ({
  increaseBy: (n: number) => ({ count: state.count + n }),
  initCount: () => ({ count: 0 }),
});

// 组合所有操作
const actions = (state: CountState) => ({
  ...createBasicCountActions(state),
  ...createAdvancedCountActions(state),
});

const initialState: CountState = { count: 0 };

const countStore = new Store<
  CountState,
  {
    increase: () => void;
    increaseBy: (n: number) => void;
    decrease: () => void;
    initCount: () => void;
  }
>(initialState, actions);

export { countStore };
