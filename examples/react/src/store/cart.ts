import { Store } from "@yoki/core";

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  name: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null,
};

export const cartStore = new Store<CartState>(initialState);

// Actions
export const addToCart = (product: {
  id: number;
  name: string;
  price: number;
}) => {
  cartStore.setState((state) => {
    const existingItem = state.items.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    return {
      items: [
        ...state.items,
        {
          id: Date.now(),
          productId: product.id,
          quantity: 1,
          price: product.price,
          name: product.name,
        },
      ],
    };
  });
};

export const removeFromCart = (id: number) => {
  cartStore.setState((state) => ({
    items: state.items.filter((item) => item.id !== id),
  }));
};

export const updateQuantity = (id: number, quantity: number) => {
  cartStore.setState((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ),
  }));
};

export const toggleCart = () => {
  cartStore.setState((state) => ({
    isOpen: !state.isOpen,
  }));
};
