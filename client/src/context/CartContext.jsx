import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('rfpm_rfq_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('rfpm_rfq_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (machine, quantity = 1) => {
    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex((i) => i.productId === machine._id || i.slug === machine.slug);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            productId: machine._id,
            slug: machine.slug,
            name: machine.name,
            category: machine.category,
            capacity: machine.capacity || 'Standard',
            power: machine.power || '',
            image: (machine.images && machine.images[0]) || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
            price: machine.price || 'Get Quote',
            quantity: quantity
          }
        ];
      }
    });
    setIsDrawerOpen(true); // Open drawer so customer sees item added!
  };

  const updateQuantity = (identifier, quantity) => {
    if (quantity <= 0) {
      removeFromCart(identifier);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === identifier || item.slug === identifier
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (identifier) => {
    setItems((prev) => prev.filter((item) => item.productId !== identifier && item.slug !== identifier));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemCount = items.reduce((acc, curr) => acc + (curr.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

