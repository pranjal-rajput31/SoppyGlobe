// 

// Cart selectors for accessing cart state

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;

export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export const selectCartItemsCount = (state) => state.cart.items.length;

// ✅ Use _id consistently (MongoDB)
export const selectCartItemById = (state, itemId) =>
  state.cart.items.find((item) => item.id === itemId);

export const selectIsItemInCart = (state, itemId) =>
  state.cart.items.some((item) => item.id === itemId);

export const selectCartItemQuantityById = (state, itemId) => {
  const item = state.cart.items.find((item) => item.id === itemId);
  return item ? item.quantity : 0;
};

export const selectCartSummary = (state) => ({
  items: state.cart.items,
  totalQuantity: state.cart.totalQuantity,
  totalPrice: state.cart.totalPrice,
  itemsCount: state.cart.items.length,
  isEmpty: state.cart.items.length === 0,
});