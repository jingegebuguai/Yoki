type Listener<T> = (state: T) => void;
type Selector<T, S> = (state: T) => S;

interface Subscription<T, S> {
  selector?: Selector<T, S>;
  lastValue?: any;
}

// setState can accept either partial state or a function returning partial state
type SetStateParam<T> = Partial<T> | ((state: T) => Partial<T>);
type SetState<T> = (param: SetStateParam<T>) => void;

export type Action<T> = (...args: any[]) => void;
export type Actions<T> = Record<string, Action<T>>;

export class Store<T extends object, A extends Record<string, Action<T>>> {
  private listeners: Set<Listener<T>> = new Set();
  private subscriptions: WeakMap<Listener<T>, Subscription<T, any>> =
    new WeakMap();
  private state: T;
  private _actions: A;

  constructor(
    initialState: T,
    actions: (state: T) => Record<string, (...args: any[]) => Partial<T>>
  ) {
    this.state = initialState;

    // Create setState function
    const setState = (param: SetStateParam<T>) => {
      const partialState =
        typeof param === "function" ? param(this.state) : param;

      const newState = { ...this.state, ...partialState };

      if (this.state === newState) return;

      const prevState = this.state;
      this.state = newState;
      this.notify(prevState);
    };

    // Create actions with state
    const stateActions = actions(this.state);

    // Bind actions to store instance and wrap with setState
    const boundActions = {} as A;
    for (const key in stateActions) {
      const action = stateActions[key];
      // @ts-ignore
      boundActions[key] = (...args: any[]) => {
        const nextState = action(...args);
        setState(nextState);
      };
      // @ts-ignore
      this[key] = boundActions[key];
    }
    this._actions = boundActions;
  }

  private notify(prevState: T) {
    this.listeners.forEach((listener) => {
      const subscription = this.subscriptions.get(listener);
      if (!subscription) return;

      const { selector, lastValue } = subscription;

      if (selector) {
        const currentValue = selector(this.state);
        if (currentValue !== lastValue) {
          subscription.lastValue = currentValue;
          listener(this.state);
        }
      } else {
        listener(this.state);
      }
    });
  }

  subscribe(listener: Listener<T>, selector?: Selector<T, any>): () => void {
    const subscription: Subscription<T, any> = {
      selector,
      lastValue: selector ? selector(this.state) : undefined,
    };
    this.listeners.add(listener);
    this.subscriptions.set(listener, subscription);

    return () => {
      this.listeners.delete(listener);
    };
  }

  get actions(): A {
    return this._actions;
  }

  getState(): T {
    return this.state;
  }
}
