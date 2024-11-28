
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


export const getTopOrderedFoods = (page, size) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8080/api/food/top-ordered-foods?page=${page}&size=${size}`);
        const data = await response.json();
        dispatch({ type: "SET_TOP_ORDERED_FOODS", payload: data });
        console.log("Top Ordered Foods", data);
    } catch (error) {
        console.error("Failed to fetch top-ordered foods:", error);
    }
};

