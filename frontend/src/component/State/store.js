import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Authentition/Reducer";

import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";
import restaurantsOrderReducer from "./Restaurant Order/Reducer";
import foodReducer from "./Food/Reducer";
import  restaurantReducer  from "./Restaurant/Reducer";

const rooterReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantsOrderReducer,
    ingredients: ingredientReducer,
    foods: foodReducer
})

export const store = legacy_createStore(rooterReducer,applyMiddleware(thunk));
