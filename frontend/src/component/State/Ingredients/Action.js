




import { type } from "@testing-library/user-event/dist/type";
import {API_URL, api} from "../../Config/api"
import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_LAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from "./ActionType";

export const getIngredientOfRestaurant = ({id, jwt})=>{
return async (dispatch) =>{
    try {
        const response = await api.get(`/api/admin/ingredients/restaurant/${id}`,{
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("get all ingredients", response.data);
        dispatch({type:GET_INGREDIENTS, payload:response.data})
    } catch (error) {
        console.log("error get all ingredients", error);
    }
}
}

export const createIngredientCategory = ({data, jwt}) =>{
    console.log("data", data, "jwt",jwt);
    return async (dispatch) =>{
        try {
            const reponse = await api.post(`/api/admin/ingredients/category`,data,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            console.log("create ingredient category", reponse.data);
            dispatch({type:CREATE_INGREDIENT_CATEGORY_SUCCESS, payload:reponse.data})
        } catch (error) {
            console.log("error", error);
        }
    }
}

export const createIngredient = ({data, jwt}) =>{
    return async (dispatch) =>{
        try {
            const response = await api.post(`/api/admin/ingredients`, data,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("create ingredients", response.data);
            dispatch({type:CREATE_INGREDIENT_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("error create ingredients", error);
        }
    }
}

export const getIngredientCategory =({id, jwt}) =>{
    return async (dispatch) =>{
        try {
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("get ingredients category", response.data);
            dispatch({type:GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data})
        } catch (error) {
            console.log("error get ingredients category", error);           
        }
    }
}

export const updateStockOfIngredient = ({id, jwt}) =>{
    return async (dispatch) =>{
        try {
            const {data} = await api.put(`/api/admin/ingredients/${id}/stoke`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            dispatch({type:UPDATE_STOCK, payload: data})
            console.log("update ingredients stock", data);
        } catch (error) {
            console.log("error update ingredients stock", error);
            
        }
    }
}