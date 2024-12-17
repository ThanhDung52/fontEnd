// import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
// import { Field, Form, Formik } from "formik";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../State/Authentition/Action";
// import { useDispatch } from "react-redux";

// const initialValues = {
//     fullname: "",
//     email: "",
//     password: "",
//     role: "ROLE_CUSTOMER"
// }

// export default function RegisterForm  () {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const handleSubmit = (values) => {
//         // console.log("form values ", values);
//         dispatch(registerUser({ useData: values, navigate }))
//     }
//     return (
//         <div>

//             <Typography variant="h5" className="text-center">
//                 Register
//             </Typography>
//             <Formik onSubmit={handleSubmit} initialValues={initialValues}>
//                 <Form>
//                     <Field
//                         as={TextField}
//                         name="fullname"
//                         label="fullname"
//                         fullWidth
//                         variant="outlined"
//                         margin="normal"
//                     />
//                     <Field
//                         as={TextField}
//                         name="email"
//                         label="email"
//                         fullWidth
//                         variant="outlined"
//                         margin="normal"
//                     />
//                     <Field
//                         as={TextField}
//                         name="password"
//                         label="password"
//                         fullWidth
//                         variant="outlined"
//                         margin="normal"
//                         type="password"
//                     />

//                     <Field
//                         as={Select}
//                         fullWidth
//                         margin="normal"
//                         labelId="role-simple-select-label"
//                         id="demo-simple-select"
//                         name="role"
//                     // value={}
//                     // onChange={handleChange}
//                     >
//                         <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
//                         <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
//                     </Field>
//                     <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type="submit" variant="contained">
//                         Register
//                     </Button>

//                 </Form>
//             </Formik>
//             <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//                 if have an account already?
//                 <Button size="small" onClick={() => navigate("/account/login")}>
//                     Login
//                 </Button>
//             </Typography>

//         </div>
//     )
// }


import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho Toast
import axios from "axios"; // Thêm axios để gọi API

// Giá trị ban đầu của form
const initialValues = {
  fullname: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
};

// Xác thực form với Yup
const validationSchema = Yup.object({
  fullname: Yup.string().required("Họ tên là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
  role: Yup.string().required("Vai trò là bắt buộc")
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log("Giá trị form: ", values);

    try {
      // Gọi API để đăng ký người dùng
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email: values.email,
        fullname: values.fullname,
        password: values.password,
        role: values.role
      });

      // Kiểm tra nếu đăng ký thành công
      if (response.status === 201) {
        // Hiển thị thông báo đăng ký thành công
        toast.success("Đăng ký thành công!");

        // Lưu JWT token vào localStorage hoặc Redux
        localStorage.setItem("jwtToken", response.data.jwt);

        // Sau 3 giây, chuyển hướng người dùng đến trang đăng nhập
        setTimeout(() => {
          navigate("/account/login");
        }, 3000); // Chờ 3 giây trước khi chuyển hướng
      }
    } catch (error) {
      // Kiểm tra nếu có lỗi từ server
      if (error.response && error.response.status === 409) {
        // Hiển thị thông báo lỗi nếu email đã tồn tại
        toast.error("Email đã được sử dụng!");
      } else {
        // Hiển thị lỗi chung
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
      }
    }
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Đăng ký
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <Field
              as={TextField}
              name="fullname"
              label="Họ tên"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.fullname && Boolean(errors.fullname)}
helperText={touched.fullname && errors.fullname}
            />

            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Field
              as={TextField}
              name="password"
              label="Mật khẩu"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Field
              as={Select}
              fullWidth
              margin="normal"
              labelId="role-simple-select-label"
              id="demo-simple-select"
              name="role"
              value={values.role} // Liên kết với giá trị trong Formik
              onChange={handleChange}
              error={touched.role && Boolean(errors.role)}
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Khách hàng</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Chủ nhà hàng</MenuItem>
            </Field>

            <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type="submit" variant="contained">
              Đăng ký
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Bạn đã có tài khoản?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Đăng nhập
        </Button>
      </Typography>

      {/* Đặt ToastContainer ở cuối trang để không bị che khuất */}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </div>
  );
}