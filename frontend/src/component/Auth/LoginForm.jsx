
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../State/Authentition/Action";
import Notification from "../../AdminComponent/Notification/Notification";
const initialValues={
    email:"",
    password:""
}

export const LoginForm = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');


    const handleSubmit=(values)=>{
        dispatch(LoginUser({useData:values, navigate}))
      
    }
    return(
        <div>
            
            <Typography variant="h5" className="text-center">
                login
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>

                <Field
                                as={TextField}
                                name="email"
                                label="email"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                />
                                <Field
                                as={TextField}
                                name="password"
                                label="password"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                type="password"
                                />
                                <Button sx={{mt:2, padding:"1rem"}} fullWidth type="submit"  variant="contained">
                                    Login
                                </Button>
                                

                </Form>
            </Formik>
<Typography variant="body2" align="center" sx={{mt:3}}>
        Don't have an account?
        <Button size="small" onClick={()=>navigate("/account/register")}>
            register
        </Button>
</Typography>

        </div>
    )
}