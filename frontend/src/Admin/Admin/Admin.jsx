import React from "react";
import { useDispatch } from "react-redux";
import { AdminSideBar } from "./AdminSideBar"
import { Dashboard } from "../Dashboard/Dashboard";
import { Restaurant } from "../Restaurant/Restaurant";
import { User } from "../User/user";
import { Route, Routes } from "react-router-dom";


export const Admin = () => {
    const jwt = localStorage.getItem("jwt")
    const handleClose = () => {

    }



    return (
        <div className="lg:flex justify-between">
            <div>
                <AdminSideBar handleColse={handleClose} />
            </div>
            <div className="lg:w-[80%]">
                    <Routes>
                        <Route path="/" element={<Dashboard/> }/>
                        <Route path="/restaurant" element={<Restaurant/> }/>
                        <Route path="/Custommer" element={<User /> }/>                       
                    </Routes>
                </div>
        </div>
    )
}