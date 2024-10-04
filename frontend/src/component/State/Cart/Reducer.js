

import { LOGOUT } from "../Authentition/ActionType"
import * as actionTypes from "./ActionType"

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null
}
const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.food.price), 0);
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPDATE_CADRITEM_REQUEST:
        case actionTypes.REMOVE_CADRITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEARE_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.item
            }
        case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
            const newCartItems = [action.payload, ...state.cartItems];
            return {
                ...state,
                loading: false,
                cartItems: newCartItems,
                cart: {
                    ...state.cart,
                    total: calculateTotal(newCartItems)
                }
            }
            case actionTypes.UPDATE_CADRITEM_SUCCESS:
                const updatedCartItems = state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
                return {
                    ...state,
                    loading: false,
                    cartItems: updatedCartItems,
                    cart: {
                        ...state.cart,
                        total: calculateTotal(updatedCartItems)
                    }
                }
        case actionTypes.REMOVE_CADRITEM_SUCCESS:
            const remainingCartItems = state.cartItems.filter((item) =>
                item.id !== action.payload
            );
            return {
                ...state,
                loading: false,
                cartItems: remainingCartItems,
                cart: {
                    ...state.cart,
                    total: calculateTotal(remainingCartItems)
                }
            }
        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.UPDATE_CADRITEM_FAILURE:
        case actionTypes.REMOVE_CADRITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case LOGOUT:
            localStorage.removeItem("jwt");
            return { ...state, cartItems: [], cart: null, success: "logout success" }
        default:
            return state;
    }
}
export default cartReducer