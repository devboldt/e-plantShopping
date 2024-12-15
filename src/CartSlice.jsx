import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, cost, image } = action.payload;
        const itemExists = state.items.find(item => item.name === name);
        if(itemExists) {
            itemExists.count++;
        } else {
            state.items.push({name, cost, image, count: 1})
        }
    },
    removeItem: (state, action) => {
        const {name} = action.payload;
        state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
        const {name, count} = action.payload;
        const item = state.items.find(item => item.name === name);
        if(item) item.count = count; 
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
