import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../component/State/Restaurant/Action";
import { useTheme } from "@mui/material";
import { RestaurantCart } from "./RestaurantCart";

export const Restaurant = () => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const theme = useTheme();

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt));
    }, [jwt, dispatch]);

    useEffect(() => {
        console.log("users", restaurant.id); // Kiểm tra người dùng
    }, [restaurant.id]);

    return (
        <div>
            <section className="px-5 lg:px-20" pt-10>
                <h1 className="text-2xl font-semibold text-gray-400 py-3" style={{ color: theme.palette.text.secondary }}></h1>
                <div className="flex flex-wrap items-center justify-around gap-5">
                    {
                        restaurant.restaurants.map((item) => <RestaurantCart key={item.id} item={item} />)
                    }
                </div>
            </section>
        </div>
    );
}
