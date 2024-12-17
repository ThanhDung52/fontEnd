import { type } from "@testing-library/user-event/dist/cjs/utility/type.js"
import { api } from "../../Config/api"
import { GET_ALL_FOOD_SUCCESS } from "../Food/ActionType"
import { DELETE_CATEGORY_LAILURE, DELETE_CATEGORY_SUCCESS, GET_CATEGORY_LAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from "./ActionType"



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

export const deleteCategory = ({id, jwt}) => async (dispatch) =>{ 
    try {
        const data = await api.delete(`/api/category/delete/${id}`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        }
        ) 
        dispatch({type:DELETE_CATEGORY_SUCCESS, payload:id})
    } catch (error) {
        dispatch({type:DELETE_CATEGORY_LAILURE, payload:error})
    }
           
}