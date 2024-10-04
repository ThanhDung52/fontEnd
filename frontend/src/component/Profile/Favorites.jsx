import React from "react";
import RestaurantCart from "../Restaurant/RestaurantCart";
import { useSelector } from "react-redux";

export const Favorites = () =>{
    const {auth} = useSelector(store => store)
    return(
        <div>
            <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
            <div className="flex flex-wrap justify-center gap-4">
                {auth.favorites.map((item)=><RestaurantCart item={item}/>)}
            </div>
        </div>
    )
}