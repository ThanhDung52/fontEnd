import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "../Admin/Admin/Admin";

export const AdminsRoute = () =>{
    return(
        <Routes>
            <Route path="/*" element={ <Admin/> } />
        </Routes>
    )
}