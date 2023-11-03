import { createContext, useReducer } from "react";
import {
  cartInitialState,
  cartReducer,
} from "../../../05-buscador-peliculas/src/reducers/cart.reducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // para usar el useReducer, recive por parametros el reducer y el estado inicial
  // y se decestructura como un useState con el state y la funcion dispatch
  // dispatch es la que se encarga de enviar las acciones al reducer
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  // creamos la funcion para agregar el producto al carrito
  // y la funcion va a ejecutar el dispatch con el tipe de accion que tiene que hacer
  // y el objeto( producto ) con el que va a hacer esa accion
  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  /* CARRITO ECHO CON USESTATE
   const [cart, setCart] = useState([]);  
   const addToCart = (product) => {
    // chekeamos si el producto ya existe en el carrito
    const productInCartIndex = cart.findIndex((item) => item.id == product.id);

    // si ya existe le sumamos 1
    if (productInCartIndex >= 0) {
      // structuredClone hace una copia exacta, si el array es muy grande podria traer problemas
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }

    // si no esta agrega 1
    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id != product.id));
  };

  const clearCart = () => {
    setCart([]);
  }; */

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
