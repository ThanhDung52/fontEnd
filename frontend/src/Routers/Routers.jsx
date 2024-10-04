import React from "react";
import { Routes ,Route } from "react-router-dom";
import { AdminRoute } from "./AdmionRoute";
import { CustomerRoute } from "./CustomerRoute";

const Routers =  () =>{
    return(
            <Routes>
                <Route path="/admin/restaurants/*" element={<AdminRoute/>}></Route>
                <Route path="/*" element={<CustomerRoute/>}></Route>
            </Routes>
    )
}

export default Routers