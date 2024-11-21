import { GET_CATEGORY_LAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from "./ActionType"

const initialState = {
    loading:false,
    categorys:[],
    error:null
}

const categoryReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_CATEGORY_REQUEST:
            return{
                ...state,
                loading: true,
                error:null
            }
        case GET_CATEGORY_SUCCESS:
            return{
                ...state,
                loading:false,
                categorys:action.payload.data
            }
        case GET_CATEGORY_LAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        default:
            return state;
    }
}

export default categoryReducer;