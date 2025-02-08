import { Store } from "@yoki/core";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    inStock: boolean;
    priceRange: { min: number; max: number };
  };
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    inStock: false,
    priceRange: { min: 0, max: 1000 },
  },
};

export const productsStore = new Store<ProductsState>(initialState);

// Actions
export const fetchProducts = async () => {
  productsStore.setState({ loading: true, error: null });
  try {
    // 模拟 API 调用
    // const response = await fetch("/api/products");
    // const products = await response.json();
    const products = [
      {
        id: 1,
        name: "Product 1",
        price: 10,
        description: "Description 1",
        category: "Category 1",
        inStock: true,
      },
      {
        id: 2,
        name: "Product 2",
        price: 20,
        description: "Description 2",
        category: "Category 2",
        inStock: false,
      },
    ];
    productsStore.setState({ items: products, loading: false });
  } catch (error) {
    productsStore.setState({
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
      loading: false,
    });
  }
};

export const updateFilters = (filters: Partial<ProductsState["filters"]>) => {
  productsStore.setState((state) => ({
    filters: { ...state.filters, ...filters },
  }));
};
