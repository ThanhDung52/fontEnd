import * as actionType from "./ActionTypes";

const initialState = {
    restaurants: [],
    userRestaurant: null, // Sửa lỗi chính tả
    restaurant: null,
    loading: false,
    error: null,
    events: [],
    restaurantsEvents: [],
    categories: [],
    restaurantRevenues: []
}

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_RESTAURANT_REQUEST:
        case actionType.GET_ALL_RESTAURANT_REQUEST:
        case actionType.DELETE_RESTAURANT_REQUEST:
        case actionType.UPDATE_RESTAURANT_REQUEST:
        case actionType.GET_RESTAURANT_BY_ID_REQUEST:
        case actionType.CREATE_CATEGORY_REQUEST:
        case actionType.GET_RESTAURANT_CATEGORY_REQUEST:
        case actionType.GET_RESTAURANTREVENUE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionType.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                userRestaurant: action.payload // Cập nhật `userRestaurant` khi tạo mới
            }
        case actionType.GET_ALL_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload
            }
        case actionType.GET_RESTAURANTREVENUE_SUCCESS: // Xử lý trạng thái SUCCESS cho GET_RESTAURANTREVENUE
            return {
                ...state,
                loading: false,
                restaurantRevenues: action.payload // Cập nhật doanh thu của nhà hàng
            };
        case actionType.GET_RESTAURANTREVENUE_FAILURE: // Xử lý trạng thái FAILURE cho GET_RESTAURANTREVENUE
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionType.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload
            }
        case actionType.GET_RESTAURANT_BY_USER_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                userRestaurant: action.payload // Cập nhật `userRestaurant` khi lấy theo userId
            }
        case actionType.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionType.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                restaurants: state.restaurants.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                userRestaurant: state.userRestaurant && state.userRestaurant.id === action.payload.id
                    ? action.payload
                    : state.userRestaurant,
            }
        case actionType.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload],
                restaurantsEvents: [...state.restaurantsEvents, action.payload]
            }
        case actionType.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload
            }
        case actionType.GET_RESTAURANTS_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurantsEvents: action.payload
            }
        case actionType.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter((item) => item.id !== action.payload),
                restaurantsEvents: state.restaurantsEvents.filter(
                    (item) => item.id !== action.payload
                )
            }
        case actionType.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload]
            }
        case actionType.GET_RESTAURANT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload
            }
        case actionType.CREATE_RESTAURANT_FAILURE:
        case actionType.GET_ALL_RESTAURANT_FAILURE:
        case actionType.DELETE_RESTAURANT_FAILURE:
        case actionType.UPDATE_RESTAURANT_FAILURE:
        case actionType.GET_RESTAURANT_BY_ID_FAILURE:
        case actionType.CREATE_EVENTS_FAILURE:
        case actionType.CREATE_CATEGORY_FAILURE:
        case actionType.GET_RESTAURANT_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default restaurantReducer;
