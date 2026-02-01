import { createSlice } from '@reduxjs/toolkit';
const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch the action to add the product to the cart (Redux action)
  
    setAddedToCart((prevState) => ({ // Update the local state to reflect that the product has been added
      ...prevState, // Spread the previous state to retain existing entries
      [product.name]: true, // Set the current product's name as a key with value 'true' to mark it as added
    }));
  };
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item: { name, image, description, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === product.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const productName = action.payload; // expect name string
      state.items = state.items.filter((item) => item.name !== productName);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
      // optionally, if quantity <= 0, you could remove it
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
