import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        cartItems: (JSON.parse(localStorage.getItem('cartItems'))) || []
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        addToCartAction: (state, actions) => {
            state.cartItems = [...state.cartItems , actions.payload]
            console.log(state.cartItems);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    },
})



// Action creators are generated for each case reducer function
export const { increment, addToCartAction } = counterSlice.actions
export const selectCount = (state) => state.counter.value
export const cartData = (state) => state.counter.cartItems
export default counterSlice.reducer