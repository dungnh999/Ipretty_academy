import { CartCourseStudentActionType } from "./types"
const {ADD_CART_DATA_COURSE , GET_CART_DATA_COURSE} = CartCourseStudentActionType;

const initialState = {
    cartItems: []
};
export const CartCourseStudentReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CART_DATA_COURSE: {
            console.log(11111);
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        }
        default: return state
    }
};