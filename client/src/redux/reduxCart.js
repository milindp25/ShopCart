import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState : {
        products :[],
        quantity : 0,
        total :0,
        size : ""

    },
    reducers :{
        addProduct :(state,action) => {
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += (action.payload[0].price * action.payload.cartedQuantity);
            state.size = action.payload.size;
    },
        clearCart :(state) => {
            state.quantity =0;
            state.products = [];
            state.total = 0;
            state.size = "";
    },
  },
});

export const { addProduct,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
