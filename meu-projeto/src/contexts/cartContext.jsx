import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const addToCart = (item, selectedToppings = []) => {
    const cartItem = {
      id: Date.now().toString(),
      product: item.name,
      basePrice: parseFloat(item.price.replace(",", ".")),
      toppings: selectedToppings,
      totalPrice: calculateItemTotal(item, selectedToppings),
    };

    setCart((prevCart) => ({
      items: [...prevCart.items, cartItem],
      total: prevCart.total + cartItem.totalPrice,
    }));

    toast.success(`${item.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((i) => i.id === itemId);
      return {
        items: prevCart.items.filter((i) => i.id !== itemId),
        total: prevCart.total - item.totalPrice,
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

function calculateItemTotal(item, selectedToppings) {
  const basePrice = parseFloat(item.price.replace(",", "."));
  let toppingsTotal = 0;

  if (item.freeToppings && selectedToppings.length > item.freeToppings) {
    const extraToppings = selectedToppings.length - item.freeToppings;
    const toppingPrices = selectedToppings
      .map((topping) => parseFloat(topping.price.replace(",", ".")))
      .sort((a, b) => a - b);

    for (let i = 0; i < extraToppings; i++) {
      toppingsTotal += toppingPrices[i];
    }
  }

  return basePrice + toppingsTotal;
}
