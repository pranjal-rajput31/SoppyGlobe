// 

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addItem(state, action) {
      const { id, name, price, image, quantity = 1 } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,        // ✅ use name instead of title
          price,
          image,
          quantity,
        });
      }

      // Update totals
      state.totalQuantity += quantity;
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Remove item from cart
    removeItem(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
      }

      state.items = state.items.filter((item) => item.id !== id);

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Update item quantity
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        const difference = quantity - item.quantity;
        item.quantity = quantity;
        state.totalQuantity += difference;

        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    // Clear cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;