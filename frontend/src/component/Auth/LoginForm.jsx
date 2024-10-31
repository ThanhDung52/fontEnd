import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../State/Authentition/Action";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { api, API_URL } from "../Config/api"
import axios from "axios";




const initialValues = {
  email: "",
  password: "",
};


export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

 
const handleLoginSuccess = async (credentialResponse) => {
    // const { credential } = credentialResponse;

    // if (!credential) {
    //     setMessage("Không thể lấy thông tin đăng nhập. Vui lòng thử lại.");
    //     return;
    // }

    // localStorage.setItem("jwt", credential);

    // try {
    //     const decodedToken = jwtDecode(credential);
    //     const email = decodedToken.email;
    //     const fullName = decodedToken.name; // Lấy tên đầy đủ từ token (nếu có)
    //     const password = "defaultPassword"; // Hoặc để trống

    //     // Gửi yêu cầu tới server của bạn với email, tên đầy đủ và mật khẩu
    //     const res = await axios.post(`${API_URL}auth/google/signin`, {
    //         email: email,
    //         fullName: fullName,
    //         password: password, // Gửi mật khẩu (có thể là giá trị mặc định)
    //     });

    //     if (res.status === 200) {
    //         navigate("/");
    //     } else {
    //         setMessage(`Có lỗi xảy ra khi lưu email: ${res.data.message}`);
    //     }
    // } catch (error) {
    //     console.error("Login failed:", error);
    //     setMessage("Có lỗi xảy ra trong quá trình đăng nhập.");
    // }
};

  
  

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
    setMessage("Đăng nhập thất bại. Vui lòng thử lại.");
  };

  const handleSubmit = (values) => {
    dispatch(LoginUser({ useData: values, navigate }));
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Đăng nhập
      </Typography>
      {message && <Typography color="error">{message}</Typography>}
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            autoComplete="email"
          />
          <Field
            as={TextField}
            name="password"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            autoComplete="current-password"
          />
          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Đăng nhập
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Chưa có tài khoản?
        <Button size="small" onClick={() => navigate("/account/register")}>
          Đăng ký
        </Button>
      </Typography>
      <div className="App">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
          prompt="consent"
        />
      </div>
    </div>
  );
};
