
import { isPresentInFavorites } from "../../Config/logic";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GET_ALL_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };
        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Login success",
            };

        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload, // Lưu danh sách user vào users
            };
        
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                favorites: action.payload.favorites,
            };

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                favorites: isPresentInFavorites(state.favorites, action.payload)
                    ? state.favorites.filter((item) => item.id !== action.payload.id)
                    : [action.payload, ...state.favorites],
            };

        case LOGOUT:
            return {
                ...initialState, // Đặt lại trạng thái về mặc định khi đăng xuất
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
        case GET_ALL_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null,
            };
        
        case DELETE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: state.users.filter(user => user.id !== action.payload.userId), // Cập nhật danh sách users
                success: "User deleted successfully",
            };

        case DELETE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null,
            };
        
        default:
            return state;
    }
}

