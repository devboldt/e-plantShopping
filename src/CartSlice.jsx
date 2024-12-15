import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0,
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
        state.totalItems++;
    },
    removeItem: (state, action) => {
        const {name} = action.payload;
        const item = state.items.find(item => item.name === name);
        if((state.totalItems - item.count) < 0 ) {
            state.totalItems = 0;
        } else {
            state.totalItems = state.totalItems - item.count;
        }
        state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
        const {name, count} = action.payload;
        const item = state.items.find(item => item.name === name);
        if(item) {
            item.count = count; 
            let totalCount = 0;
            state.items.forEach(item => {
                totalCount += item.count;
            })
            state.totalItems = totalCount;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
