import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType"
import { api } from "../../Config/api"




export const createOrder = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_ORDER_REQUEST})
        try {
            const { data } = await api.post(`/api/order`, reqData.order,{
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`
                }
            })
            // if(data.payment_url){
            //     window.location.href = data.payment_url;
            // }
            console.log("create order data", data);
            const response = { success: true, ...data };
            dispatch({type:CREATE_ORDER_SUCCESS, payload:data})
        } catch (error) {
            console.error("Error creating order: ", error);
    if (error.response) {
        console.log("Server responded with: ", error.response.data);
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.response.data });
    } else if (error.request) {
        console.log("No response received: ", error.request);
        dispatch({ type: CREATE_ORDER_FAILURE, payload: { message: "No response from server" } });
    } else {
        console.log("Error setting up request: ", error.message);
        dispatch({ type: CREATE_ORDER_FAILURE, payload: { message: error.message } });
    }
        }
    }
}

export const getUsersOrders =(jwt) =>{
    return async (dispatch) =>{
        dispatch({type:GET_USERS_ORDERS_REQUEST})
        try {
            const { data } = await api.get(`/api/order/user`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("get user order success", data);
            dispatch({type:GET_USERS_ORDERS_SUCCESS, payload:data})
        } catch (error) {
            console.log("error get user order");
            dispatch({type:GET_USERS_ORDERS_FAILURE, payload:error})
        }
    }
}

// export const getUsersNotificationAction = () =>{
//     return async (dispatch) => {
//         dispatch({type:GET_USERS_NOTIFICATION_REQUEST})
//         try {
//             const {data} = await api.get(`/api/or`)
//         } catch (error) {
            
//         }
//     }
// }