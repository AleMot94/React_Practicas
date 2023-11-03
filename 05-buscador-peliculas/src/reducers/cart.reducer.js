// en este caso esta siendo usado en un provider pero podria ser usado en un custom-hook
// una de las ventajas es que es mas facil de testear ya que solo se ejecuta el dispatch y no esta la logica en un componente
// otra situacion para usarlo es cuando ya tenes muchos estados

// los reducer trabajan con un estado inicial
export const cartInitialState = [];
// tambien necesitan el reducer que recibe el estado y la accion
// devuelve un estado a travez del estado y la accion
export const cartReducer = (state, action) => {
  // dentro del action esta el type, y el payload
  // el type es el string de la accion que tiene que ejecutar
  // en el payload pasamos el nuevo objeto para actualizar el estado
  const { type, payload } = action;
  // es normal usar un switch para definir las acciones que va a tener el reducer
  switch (type) {
    case "ADD_TO_CART": {
      // accedemos a la propidedad que queremos del objeto que pasamos
      // a travez del payload
      const { id } = payload;
      // accedemos al initialState a travez de state
      const productInCartIndex = state.findIndex((item) => item.id == id);

      // si ya existe le sumamos 1
      if (productInCartIndex >= 0) {
        // structuredClone hace una copia exacta, si el array es muy grande podria traer problemas
        const newCart = structuredClone(state);
        newCart[productInCartIndex].quantity += 1;
        // devolvemos el nuevo estado
        // en vez de setar al estado como en el useState
        return newCart;
      }
      // si no existia en el carrito
      return [
        // estado previo
        ...state,
        // le agregamos el nuevo objeto al estado provio
        {
          ...payload, // destructuramos el objeto que le pasamos
          quantity: 1, // y le modificamos la cantidad
        },
      ];
    }

    case "REMOVE_FROM_CART": {
      const { id } = payload;
      return state.filter((item) => item.id != id);
    }

    case "CLEAR_CART": {
      return cartInitialState;
    }
  }
  // el reducer retorna el estado
  return state;
};
