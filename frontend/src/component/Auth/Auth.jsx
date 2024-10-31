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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
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