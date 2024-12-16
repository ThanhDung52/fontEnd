import { api } from "../../Config/api"
import { CREATE_MENU_ITEMS_FAILURE, 
    CREATE_MENU_ITEMS_REQUEST, 
    CREATE_MENU_ITEMS_SUCCESS, 
    DELETE_MENU_ITEMS_FAILURE, 
    DELETE_MENU_ITEMS_REQUEST, 
    DELETE_MENU_ITEMS_SUCCESS, 
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, 
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, 
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, 
    SEARCH_MENU_ITEMS_FAILURE, 
    SEARCH_MENU_ITEMS_REQUEST, 
    SEARCH_MENU_ITEMS_SUCCESS, 
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS
} from "./ActionType"




export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEMS_REQUEST })

        try {
            const { data } = await api.post(`api/admin/food`, menu,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
            // console.log("create menu", data);
            dispatch({type:CREATE_MENU_ITEMS_SUCCESS, payload:data})
        } catch (error) {
            console.log("error create menu", error);
            dispatch({type:CREATE_MENU_ITEMS_FAILURE, payload:error})
        }
    }
}

export const getMenuItemsByRestaurantId = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST})
        try {
            const { data } = await api.get(`/api/food/restaurant/${reqData.restaurantId}?vagetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
                {
                    headers:{
                        Authorization:`Bearer ${reqData.jwt}`
                    }
                })
            // console.log("get menu item by restaurant id", data);
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload:data})
        } catch (error) {
            console.log("error get menu items by restaurant id request", error);
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload:error})         
        }
    }
}

export const searchMenuItem = ({keyword, jwt}) =>{
    return async (dispatch) =>{
        dispatch({type:SEARCH_MENU_ITEMS_REQUEST})
        try {
            const { data } = await api.get(`api/food/search?name=${keyword}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("search menu items", data);
            dispatch({type:SEARCH_MENU_ITEMS_SUCCESS, payload:data})
        } catch (error) {
            console.log("error search menu items");
            dispatch({type:SEARCH_MENU_ITEMS_FAILURE, payload:error})
        }
    }
}

// export const getAllIngredientsOfMenuItem =(reqData) =>{
//     return async (dispatch) =>{
//         dispatch({})
//         try {
//             const { data } = await api.get(`api/food/restaurant/${reqData.headers}`,{
//                 headers:{
//                     Authorization:`Bearer ${reqData.jwt}`
//                 }
//             })
//             console.log("menu item by restaurants ", data);
//             dispatch({})
//         } catch (error) {
//             console.log("error menu item by restaurants ");
//             dispatch({})
//         }
//     }
// }

export const updateMenuItemsAvailability =({foodId, jwt}) =>{

    return async (dispatch) => {
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST})
        try {
            const { data } = await api.put(`/api/admin/food/${foodId}`,{},
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`
                    }
                }
            )
            // console.log("update men items availability", data);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data})
        } catch (error) {
            console.log("error update men items availability",error);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: error})
        }
    }
}

export const deleteFoodAction = ({ foodId, jwt }) => {
    return async (dispatch) => {
        if (!foodId) {
            console.error("Cannot delete food: ID is undefined");
            return;
        }
        dispatch({ type: DELETE_MENU_ITEMS_REQUEST });
        try {
            const { data } = await api.delete(`/api/admin/food/${foodId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({ type: DELETE_MENU_ITEMS_SUCCESS, payload: foodId });
        } catch (error) {
            dispatch({ type: DELETE_MENU_ITEMS_FAILURE, payload: error });
        }
    };
};
