import { products as initialProducts } from "./mooks/products.json";
import Products from "./components/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { useState } from "react";
import { useFilter } from "./hooks/useFilter";
import { CartProvider } from "./context/cart";

function App() {
  const [products] = useState(initialProducts);
  const { filterProducts } = useFilter();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <h1>Shopping cart</h1>
      <CartProvider>
        <Cart />
        <Header />
        <Products products={filteredProducts} />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
