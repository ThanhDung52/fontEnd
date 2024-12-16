import { api } from "../../Config/api";
import { GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";


export const updateOrderStatus = ({orderId, orderStatus, jwt}) =>{
    return async (dispatch) => {
        try {
            dispatch({type:UPDATE_ORDER_STATUS_REQUEST})
            const reponse = await api.put(
                `/api/admin/order/${orderId}/${orderStatus}`,{},{
                    headers:{
                        Authorization: `Bearer ${jwt}`
                    }
                }
                )
                const updateOrder = reponse.data;
                // console.log("update order", updateOrder);
                dispatch({type:UPDATE_ORDER_STATUS_SUCCESS, payload:updateOrder})
        } catch (error) {
            console.log("error update order");
            dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error})
        }
    }
}

export const fetchRestaurantsOrder = ({restaurantId, orderStatus, jwt}) =>{
    return async (dispatch) =>{
        try {
            dispatch({type:GET_RESTAURANTS_ORDER_REQUEST})
            const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`,{
                params:{order_status:orderStatus},
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            const orders = data;
            // console.log("restaurant order",orders);
            dispatch({type:GET_RESTAURANTS_ORDER_SUCCESS, payload:orders})
        } catch (error) {
            console.log("error restaurant order", error);
            dispatch({type:GET_RESTAURANTS_ORDER_FAILURE, payload: error})
        }
    }
}