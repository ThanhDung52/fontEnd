import {
    GET_ALL_FOOD_REQUEST,
    GET_ALL_FOOD_SUCCESS,
    GET_ALL_FOOD_FAILURE,
    GET_FILTERED_FOODS_SUCCESS,
} from "./ActionType";

const initialState = {
    loading: false,
    foods: [],  // Mảng chứa danh sách thực phẩm
    error: null,    // Biến để lưu lỗi
    searchKeyword: "",
    topOrderedFoods: [],
};

const foodReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FOOD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ALL_FOOD_SUCCESS:
            return {
                ...state,
                loading: false,
                foods: action.payload.data, // Giả sử dữ liệu thực phẩm nằm trong `data`
            };
        case GET_FILTERED_FOODS_SUCCESS:
            return{
                ...state,
                foods:action.payload
            }
        case "SET_TOP_ORDERED_FOODS":
            return {
                ...state,
                loading: false,
                topOrderedFoods: action.payload,  // Dữ liệu trực tiếp từ payload
            };
        case "SET_SEARCH_KEYWORD":
            return { ...state, searchKeyword: action.payload };
        case GET_ALL_FOOD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Lưu lỗi vào state
            };
      
        default:
            return state;
    }
};

export default foodReducer;
