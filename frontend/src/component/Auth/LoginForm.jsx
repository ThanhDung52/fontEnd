// import { Button, TextField, Typography } from "@mui/material";
// import { Field, Form, Formik } from "formik";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { LoginUser, setUser, setUserInfo } from "../State/Authentition/Action";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import { jwtDecode } from 'jwt-decode';
// import { api, API_URL } from "../Config/api"
// import axios from "axios";
// import ResetPasswordForm from "./ResetPasswordForm"; // Import form quên mật khẩu

// const initialValues = {
//   email: "",
//   password: "",
// };

// export const LoginForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [message, setMessage] = useState("");
//   const [isResetPassword, setIsResetPassword] = useState(false); // Trạng thái hiển thị form

//   const handleLoginSuccess = async (credentialResponse) => {
//     const { credential } = credentialResponse;

//     if (!credential) {
//         setMessage("Không thể lấy thông tin đăng nhập. Vui lòng thử lại.");
//         return;
//     }

//     try {
//         const decodedToken = jwtDecode(credential);
//         const email = decodedToken.email;
//         const fullName = decodedToken.name;

//         // Gửi yêu cầu tới server
//         const res = await axios.post(`${API_URL}auth/google/signin`, {
//             email: email,
//             fullName: fullName,
//         });

//         if (res.status === 200) {
//             const { jwt, user } = res.data; // Giả sử server trả về thông tin người dùng
//             localStorage.setItem("jwt", jwt);

//             // Dispatch action để cập nhật thông tin người dùng
//             dispatch(setUser(user)); // Cập nhật thông tin người dùng từ phản hồi của server

//             navigate("/"); // Chuyển hướng đến trang chủ
//             alert("Dang nhap thanh cong ")
//             window.location.reload();
//         } else {
//             setMessage(`Có lỗi xảy ra khi lưu email: ${res.data.message}`);
//         }
//     } catch (error) {
//         // console.error("Login failed:", error);
//         setMessage("Có lỗi xảy ra trong quá trình đăng nhập.");
//     }
// };

//   const handleLoginFailure = (error) => {
//     // console.error("Login failed:", error);
//     setMessage("Đăng nhập thất bại. Vui lòng thử lại.");
//   };

//   const handleSubmit = (values) => {
//     dispatch(LoginUser({ useData: values, navigate }));
//   };

//   return (
//     <div>
//       {isResetPassword ? (
//         <ResetPasswordForm onBack={() => setIsResetPassword(false)} /> // Hiển thị form quên mật khẩu
//       ) : (
//       <>
//       <Typography variant="h5" className="text-center">
//         Đăng nhập
//       </Typography>
//       {message && <Typography color="error">{message}</Typography>}
//       <Formik onSubmit={handleSubmit} initialValues={initialValues}>
//         <Form>
//           <Field
//             as={TextField}
//             name="email"
//             label="Email"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             autoComplete="email"
//           />
//           <Field
//             as={TextField}
//             name="password"
//             label="Mật khẩu"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             type="password"
//             autoComplete="current-password"
//           />
//           <Button
//             sx={{ mt: 2, padding: "1rem" }}
//             fullWidth
//             type="submit"
//             variant="contained"
//           >
//             Đăng nhập
//           </Button>
//         </Form>
//       </Formik>
//       <Typography
//             variant="body2"
//             align="center"
//             sx={{ mt: 3 }}
//             onClick={() => navigate("/account/reset") } // Chuyển sang form quên mật khẩu
//             style={{ cursor: "pointer", color: "#007BFF" }}
//           >
//             Quên mật khẩu?
//           </Typography>
//       <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//         Chưa có tài khoản?
//         <Button size="small" onClick={() => navigate("/account/register")}>
//           Đăng ký
//         </Button>
//       </Typography>
//       <div className="App">
//         <GoogleLogin className="items-center"
//           onSuccess={handleLoginSuccess}
//           onError={handleLoginFailure}
//           scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
//           prompt="consent"
//         />
//       </div>
//       </>
//       )}
//     </div>
//   );
// };

import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../State/Authentition/Action";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { api, API_URL } from "../Config/api";
import axios from "axios";
import ResetPasswordForm from "./ResetPasswordForm"; // Import form quên mật khẩu
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho Toastify

// Initial form values
const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isResetPassword, setIsResetPassword] = useState(false); // Trạng thái hiển thị form

  // Handle login success via Google OAuth
  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    if (!credential) {
      toast.error("Không thể lấy thông tin đăng nhập. Vui lòng thử lại.");
      return;
    }

    try {
      const decodedToken = jwtDecode(credential);
      const email = decodedToken.email;
      const fullName = decodedToken.name;

      // Gửi yêu cầu tới server
      const res = await axios.post(`${API_URL}auth/google/signin`, {
        email: email,
        fullName: fullName,
      });

      if (res.status === 200) {
        const { jwt, user } = res.data; // Giả sử server trả về thông tin người dùng
        localStorage.setItem("jwt", jwt);

        // Dispatch action để cập nhật thông tin người dùng
        dispatch(setUser(user)); // Cập nhật thông tin người dùng từ phản hồi của server

        toast.success("Đăng nhập thành công!"); // Hiển thị thông báo thành công

        // Đợi một chút trước khi chuyển hướng
        setTimeout(() => {
          navigate("/"); // Chuyển hướng đến trang chủ
          window.location.reload(); // Tải lại trang (nếu cần)
        }, 2000); // Delay 2 giây (2000ms)
      } else {
        toast.error(`Có lỗi xảy ra khi lưu email: ${res.data.message}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Có lỗi xảy ra trong quá trình đăng nhập.");
    }
  };

  // Handle login failure
  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
    toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${API_URL}auth/signin`, values);

      if (res.status === 200) {
        const { jwt, user } = res.data;
        localStorage.setItem("jwt", jwt);

        dispatch(setUser(user)); // Cập nhật thông tin người dùng
        // toast.success("Đăng nhập thành công!"); // Thêm thông báo đăng nhập thành công

        // Đợi một chút trước khi chuyển hướng
        setTimeout(() => {
          navigate("/"); // Chuyển hướng đến trang chủ
          window.location.reload(); // Tải lại trang (nếu cần)
        }, 3000); // Delay 2 giây (2000ms) để người dùng có thời gian đọc thông báo
      } else {
        toast.error("Sai email hoặc mật khẩu. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        toast.error(
          error.response.data.message || "Có lỗi xảy ra khi đăng nhập."
        );
      } else {
        toast.error("Không thể kết nối tới máy chủ. Vui lòng thử lại.");
      }
    }
  };

  // Validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(3, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
  });

  return (
    <div>
      {isResetPassword ? (
        <ResetPasswordForm onBack={() => setIsResetPassword(false)} /> // Hiển thị form quên mật khẩu
      ) : (
        <>
          <Typography variant="h5" className="text-center">
            Đăng nhập
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  error={!!errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
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
                  error={!!errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
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
            )}
          </Formik>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
            onClick={() => navigate("/account/reset")} // Chuyển sang form quên mật khẩu
            style={{ cursor: "pointer", color: "#007BFF" }}
          >
            Quên mật khẩu?
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Chưa có tài khoản?
            <Button size="small" onClick={() => navigate("/account/register")}>
              Đăng ký
            </Button>
          </Typography>
          <div className="App">
            <GoogleLogin
              className="items-center"
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
              prompt="consent"
            />
          </div>
        </>
      )}

      {/* Hiển thị Toastify */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
