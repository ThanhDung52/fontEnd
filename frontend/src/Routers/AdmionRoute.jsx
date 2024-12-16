import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import { Admin } from "../AdminComponent/Admin/Admin";
import { useSelector } from "react-redux";
import App from "../AdminComponent/App";
import { CssBaseline } from "@mui/material";

export const AdminRoute = () => {
    const  {restaurant}= useSelector(store => store);
    // console.log("UserRestaurant", restaurant.userRestaurant);
    
    

    return(
        <div>  
            <Routes>
                <Route path="/*" element={!restaurant.userRestaurant ? <CreateRestaurantForm/> : <Admin/>}/>
            </Routes>
        </div>
    );
}