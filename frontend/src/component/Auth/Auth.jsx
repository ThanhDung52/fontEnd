import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../Cart/Cart";
import { LoginForm } from "./LoginForm";
import RegisterForm from "./RegisterForm";

export const Auth=()=>{
    const location = useLocation();
const navigate = useNavigate();
const handleOnClose =() =>{
    navigate("/")
};

    return(
        <div>

            <Modal onClose={handleOnClose} open={
                location.pathname==="/account/register"
                || location.pathname==="/account/login"
               
            }>
                <Box sx={style}>
                    {
                         location.pathname==="/account/register" ? <RegisterForm />  :
                         <LoginForm/>
                    }
                </Box>
            </Modal>


        </div>
    )
}