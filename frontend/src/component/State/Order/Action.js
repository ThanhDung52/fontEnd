import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType"
import { api } from "../../Config/api"




export const createOrder = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_ORDER_REQUEST})
        try {
            const { data } = await api.post(`/api/order`, reqData.order,{
                headers:{
                    Authorization: `Bearer ${reqData.jwt}`
                }
            })
            
            // if(data.payment_url){
            //     window.location.href = data.payment_url;
            // }

              // Kiểm tra nếu có payment_url và là thanh toán trực tuyến
            if (data.payment_url && reqData.order.paymentMethod === "online") {
                // Chuyển hướng đến trang thanh toán trực tuyến
                window.location.href = data.payment_url;
            } else {
                // Không có payment_url thì là thanh toán khi nhận hàng
                console.log("Thanh toán khi nhận hàng, không cần payment_url.");
            }
            
            console.log("create order data", data);
            dispatch({type:CREATE_ORDER_SUCCESS, payload:data})
        } catch (error) {
            console.log("error create order data", error);
            dispatch({type:CREATE_ORDER_FAILURE, payload:error})
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
            // console.log("get user order success", data);
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