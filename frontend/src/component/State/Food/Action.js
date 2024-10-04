import { type } from "@testing-library/user-event/dist/type"
import { api } from "../../Config/api"
import { GET_ALL_FOOD_FAILURE, GET_ALL_FOOD_REQUEST, GET_ALL_FOOD_SUCCESS } from "./ActionType"

export const getAllFood =() =>{
    return async (dispatch) =>{
        dispatch({type:GET_ALL_FOOD_REQUEST})

        try {
            const data = await api.get(`/api/food`)
            dispatch({type:GET_ALL_FOOD_SUCCESS, payload:data})
            console.log("Get all food success", data);
            
        } catch (error) {
            dispatch({type:GET_ALL_FOOD_FAILURE, payload:error})
            console.log("Erorr get all food", error);
            
        }
    }
}