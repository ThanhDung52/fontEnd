import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEARE_CART_FAILURE, CLEARE_CART_REQUEST, CLEARE_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CADRITEM_FAILURE, REMOVE_CADRITEM_REQUEST, REMOVE_CADRITEM_SUCCESS, UPDATE_CADRITEM_FAILURE, UPDATE_CADRITEM_REQUEST, UPDATE_CADRITEM_SUCCESS } from "./ActionType"


import { api } from "../../Config/api"


export const findCart  = (token) =>{
    return async (dispatch) =>{
        dispatch({type:FIND_CART_REQUEST})
        try {
            const respose = await api.get(`/api/cart`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
          
            dispatch({type:FIND_CART_SUCCESS,  payload:respose.data})
        } catch (error) {
            console.log("error find cart", error);
            dispatch({type:FIND_CART_FAILURE, payload:error.response ? error.response.data : error.message})
        }
    }
}

export const getAllCartItem = (reqData) =>{
    return async (dispatch) => {  
        dispatch({type:GET_ALL_CART_ITEMS_REQUEST})
        try {
            const respose = await api.get(`/api/carts/${reqData.cartId}/items`,{
               headers:{
                Authorization: `Bearer ${reqData.token}`
               } 
            })
            console.log("get all cart item", respose.data);
            dispatch({type:GET_ALL_CART_ITEMS_SUCCESS, payload:respose.data})
        } catch (error) {
            console.log("error get all cart item", error);
            dispatch({type:GET_ALL_CART_ITEMS_FAILURE, payload:error})
        }
    }
}

export const addItemToCart = (reqData) =>{
    return async (dispatch) => {
        dispatch({type:ADD_ITEM_TO_CART_REQUEST})
        try {
            const { data } = await api.put(`/api/cart/add`,reqData.cartItem,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            console.log("Add item to cart", data);
            dispatch({type:ADD_ITEM_TO_CART_SUCCESS, payload: data})
        } catch (error) {
            console.log("error add item to cart", error);
            dispatch({type:ADD_ITEM_TO_CART_FAILURE, payload: error.message})
        }
    }
}

export const updateCariItem = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type:UPDATE_CADRITEM_REQUEST})
        try {
            const { data } = await api.put(`/api/cart-item/update`,reqData.data,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            })
            console.log("update cartItem", data);
            dispatch({type:UPDATE_CADRITEM_SUCCESS, payload:data})
        } catch (error) {
            console.log("error update cartItem", error);
            dispatch({type:UPDATE_CADRITEM_FAILURE, payload:error.message})
        }
    }
}

export const removeCartItem = ({cartItemId, jwt}) =>{
    return async (dispatch) =>{
        dispatch({type:REMOVE_CADRITEM_REQUEST})
        try {
            const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            console.log("remove cartitem", data);
            dispatch({type:REMOVE_CADRITEM_SUCCESS, payload:cartItemId})
        } catch (error) {
            console.log("error remove cartitem", error);
            dispatch({type:REMOVE_CADRITEM_FAILURE, payload:error.message})
        }
    }
}


export const clearCartAction = () =>{
    return async (dispatch) =>{
        dispatch({type:CLEARE_CART_REQUEST})
        try {
            const {data } = await api.put(`/api/cart/clear`,{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })
            dispatch({type:CLEARE_CART_SUCCESS,payload: data})
            console.log("clear cart", data);
        } catch (error) {
            console.log("error clear cart");
            dispatch({type:CLEARE_CART_FAILURE, payload:error.message})
        }
    }
}