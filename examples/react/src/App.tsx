import { useEffect } from "react";
import { useStore } from "@yoki/react";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { UserProfile } from "./components/UserProfile";
import { productsStore, fetchProducts } from "./store/product";
import { cartStore, toggleCart } from "./store/cart";
import { userStore, login } from "./store/user";
import "./App.css";
import { countStore } from "./store/count";

export default function App() {
  const { isAuthenticated } = useStore(userStore);
  const { items: cartItems } = useStore(cartStore);
  const { loading } = useStore(productsStore);
  const { count, increase, initCount } = useStore(countStore);

  useEffect(() => {
    fetchProducts();
  }, []);

  console.info(111, count);

  return (
    <div className={`app ${userStore.getState().preferences.theme}`}>
      <span>count: {count}</span>
      <span onClick={increase}>Add</span>
      {/* <header>
        <div className="header-right">
          {isAuthenticated ? (
            <>
              <button onClick={toggleCart}>
                Open Cart ({cartItems.length})
              </button>
              <UserProfile />
            </>
          ) : (
            <button onClick={() => login("xd1Sg@example.com")}>Login</button>
          )}
        </div>
      </header>

      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ProductList />
            <Cart />
          </>
        )}
      </main> */}
    </div>
  );
}
