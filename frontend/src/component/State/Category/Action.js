import { api } from "../../Config/api"
import { GET_ALL_FOOD_SUCCESS } from "../Food/ActionType"
import { GET_CATEGORY_LAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from "./ActionType"



export const getAllCategory  = () =>{
    return async (dispatch)=>{
        dispatch({type:GET_CATEGORY_REQUEST})
        try {
            const data = await api.get(`/api/category/restaurant`)
            dispatch({type:GET_CATEGORY_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type:GET_CATEGORY_LAILURE, payload:error})
            console.log("error get all category", error);
            
        }
    }
}