# @yoki/core

A lightweight and flexible state management library that serves as the foundation for @yoki.

## Features

- 🎯 Simple and intuitive API
- 🔄 Reactive state updates
- 🎨 Framework agnostic
- 📦 Tiny size
- 💪 TypeScript support
- 🔍 Proxy-based state tracking

## Installation

```bash
npm install @yoki/core
```

## Basic Usage

```typescript
import { Store } from "@yoki/core";

// Define your state interface
interface CounterState {
  count: number;
  title: string;
}

// Create a store instance
const store = new Store<CounterState>({
  count: 0,
  title: "Counter",
});

// Get current state
console.log(store.getState()); // { count: 0, title: 'Counter' }

// Update state
store.setState({ count: 1 });

// Update state based on previous state
store.setState((state) => ({ count: state.count + 1 }));

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log("State updated:", store.getState());
});

// Unsubscribe when done

unsubscribe();
```

## Usage with Framework Adapters

### React

Use with [@yoki/react](https://github.com/yourusername/yoki/tree/main/packages/react):

```typescript
import { useStore } from "@yoki/react";

const state = useStore(store);
```
