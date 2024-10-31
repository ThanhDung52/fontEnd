

import { LOGOUT } from "../Authentition/ActionType"
import { ADD_ITEM_TO_CART_SUCCESS, CLEARE_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_REQUEST, REMOVE_CADRITEM_FAILURE, REMOVE_CADRITEM_REQUEST, REMOVE_CADRITEM_SUCCESS, UPDATE_CADRITEM_FAILURE, UPDATE_CADRITEM_REQUEST, UPDATE_CADRITEM_SUCCESS } from "./ActionType";


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
        case FIND_CART_REQUEST:
        case GET_ALL_CART_ITEMS_REQUEST:
        case UPDATE_CADRITEM_REQUEST:
        case REMOVE_CADRITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FIND_CART_SUCCESS:
        case CLEARE_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.item
            }
            case ADD_ITEM_TO_CART_SUCCESS:
                const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            
                let updatedCartItems = [...state.cartItems];
            
                if (existingItemIndex >= 0) {
                    // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng sản phẩm trực tiếp từ payload
                    const updatedItem = {
                        ...updatedCartItems[existingItemIndex],
                        quantity: action.payload.quantity, // Sử dụng trực tiếp từ action.payload
                        totalPrice: action.payload.quantity * updatedCartItems[existingItemIndex].food.price
                    };
                    updatedCartItems[existingItemIndex] = updatedItem;
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                    updatedCartItems = [
                        { 
                            ...action.payload, 
                            quantity: action.payload.quantity,
                            totalPrice: action.payload.quantity * action.payload.food.price 
                        }, 
                        ...updatedCartItems
                    ];
                }
            
                return {
                    ...state,
                    loading: false,
                    cartItems: updatedCartItems,
                    cart: {
                        ...state.cart,
                        total: calculateTotal(updatedCartItems)
                    }
                };
            

            return {
                ...state,
                loading: false,
                cartItems: updatedCartItems,
                cart: {
                    ...state.cart,
                    total: calculateTotal(updatedCartItems)
                }
            };

        case REMOVE_CADRITEM_SUCCESS:
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
        case UPDATE_CADRITEM_SUCCESS:
        // const updatedCartItem = state.cartItems.map((item) =>
        //     item.id === action.payload.id ? action.payload : item
        // );
        // return {
        //     ...state,
        //     loading: false,
        //     cartItems: updatedCartItem,
        //     cart: {
        //         ...state.cart,
        //         total: calculateTotal(updatedCartItem)
        //     }
        // }

        case UPDATE_CADRITEM_SUCCESS:
            const updatedCartItem = state.cartItems.map((item) =>
                item.id === action.payload.id
                    ? {
                        ...action.payload,
                        totalPrice: action.payload.quantity * action.payload.food.price
                    }
                    : item
            );
            return {
                ...state,
                loading: false,
                cartItems: updatedCartItem,
                cart: {
                    ...state.cart,
                    total: calculateTotal(updatedCartItem)
                }
            };

        case FIND_CART_FAILURE:
        case UPDATE_CADRITEM_FAILURE:
        case REMOVE_CADRITEM_FAILURE:
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