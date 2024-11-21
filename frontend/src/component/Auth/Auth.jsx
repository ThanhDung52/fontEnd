import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import RegisterForm from "./RegisterForm";

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClose = () => {
    navigate("/");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "900px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 0, // Không thêm padding để tối ưu bố cục
    borderRadius: "10px",
  };

  return (
    <div>
      <Modal
        onClose={handleOnClose}
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        }
      >
        <Box
          sx={{
            ...style,
            display: "flex",
            alignItems: "stretch", // Các phần tử cùng chiều cao
            overflow: "hidden", // Đảm bảo nội dung không tràn ra ngoài
            height:"500px"
          }}
        >
          {/* Phần hình ảnh */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0f0f0", // Màu nền cho ảnh
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGqfvTjri_uqHnLuYTb75WQNIXwPvBmpkCh_UZi3ETJ-Jf2ElPm-9q0TEmUqTURorvNys&usqp=CAU"
              alt="Illustration"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ảnh lấp đầy div
              }}
            />
          </div>

          {/* Phần form */}
          <div
            style={{
              flex: 1,
              maxWidth: "400px", // Đặt chiều rộng cố định cho form
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              {location.pathname === "/account/register" ? (
                <RegisterForm />
              ) : (
                <LoginForm />
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
