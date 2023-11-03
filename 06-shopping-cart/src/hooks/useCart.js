import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
  const cart = useContext(CartContext);

  // es buena practica en los customHooks con useContext
  // validar si existe el contexto, por si se llama en un lugar sin el provider
  if (cart == undefined) {
    throw new Error(
      "useCart puede estar siendo llamado en un lugar sin provider"
    );
  }

  return cart;
};
