

  import React, { useState } from "react";
  import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
  
  const ResetPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Trạng thái đang tải
    const [showVerificationInput, setShowVerificationInput] = useState(false); // Hiển thị ô nhập mã
    const [verificationCode, setVerificationCode] = useState(""); // Mã xác minh
    const [showNewPasswordFields, setShowNewPasswordFields] = useState(false); // Hiển thị ô nhập mật khẩu mới
    const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới
    const [confirmPassword, setConfirmPassword] = useState(""); // Xác minh mật khẩu mới
    const [isVerified, setIsVerified] = useState(false); // Trạng thái xác minh
  const navigate = useNavigate()
    // Gửi yêu cầu email để xác minh
    const sendEmailRequest = async (e) => {
      e.preventDefault();
      setLoading(true); // Bắt đầu trạng thái tải
      setMessage("");
      setError("");
  
      try {
        const response = await axios.post(
          `http://localhost:8080/api/email/send?to=${email}&subject=Bạn đang yêu cầu cập nhật mật khẩu`,
          {
            params: {
              to: email, // Email người nhận
              subject: "Mã xác minh của bạn là: ",
            },
          }
        );
        setMessage(response.data.message || "Mã xác minh đã được gửi đến Email của bạn!");
        setShowVerificationInput(true); // Hiển thị ô nhập mã xác minh
      } catch (err) {
        setError("Có lỗi xảy ra khi gửi email. Vui lòng kiểm tra lại.");
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    };
  
    // Xác minh mã xác minh
    const verifyCode = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setError("");
  
      try {
        const response = await axios.post(
          `http://localhost:8080/api/email/verify?email=${email}&code=${verificationCode}`,
          {
            email,
            code: verificationCode,
          }
        );
  
        if (response.data === "Xác minh thành công!") {
          setMessage("Xác minh thành công!"); // Hiển thị thông báo thành công
          setShowVerificationInput(false); // Ẩn ô nhập mã xác minh
          setShowNewPasswordFields(true); // Hiển thị ô nhập mật khẩu mới
          setIsVerified(true); // Đánh dấu đã xác minh thành công
        } else {
          setError("Mã xác minh không chính xác. Vui lòng thử lại.");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi xác minh. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
  
    // Đổi mật khẩu mới
    const resetPassword = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setError("");
    
      // Kiểm tra nếu mật khẩu mới dưới 6 ký tự
      if (newPassword.length < 6) {
        setError("Mật khẩu mới phải chứa ít nhất 6 ký tự.");
        setLoading(false);
        return;
      }
    
      // Kiểm tra nếu mật khẩu mới và xác minh mật khẩu không khớp
      if (newPassword !== confirmPassword) {
        setError("Mật khẩu mới và xác minh mật khẩu không khớp.");
        setLoading(false);
        return;
      }
    
      try {
        // Gửi yêu cầu thay đổi mật khẩu tới backend
        const response = await axios.put(
          `http://localhost:8080/api/users/reset-password`, // API URL
          {
            email, // email từ input
            newPassword, // mật khẩu mới
          }
        );
    
        setMessage("Mật khẩu đã được thay đổi thành công!"); // Thông báo thành công
        setShowNewPasswordFields(false); // Ẩn các trường nhập mật khẩu mới sau khi thành công
      } catch (err) {
        setError("Có lỗi xảy ra khi thay đổi mật khẩu. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h1>Quên mật khẩu</h1>
  
        {/* Form gửi yêu cầu xác minh, chỉ hiển thị nếu chưa xác minh */}
        {!isVerified && !showVerificationInput && (
          <form onSubmit={sendEmailRequest}>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading} // Vô hiệu hóa khi đang tải
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                backgroundColor: loading ? "#ccc" : "#007BFF",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </form>
        )}
  
        {/* Hiển thị thông báo */}
        {message && <p style={{ marginTop: "20px", color: "green" }}>{message}</p>}
        {error && <p style={{ marginTop: "20px", color: "red" }}>{error}</p>}
  
        {/* Hiển thị ô nhập mã xác minh */}
        {showVerificationInput && (
          <form onSubmit={verifyCode} style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Nhập mã xác minh"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading} // Vô hiệu hóa khi đang tải
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                backgroundColor: loading ? "#ccc" : "#28a745",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Đang xác minh..." : "Xác minh mã"}
            </button>
          </form>
        )}
  
        {/* Hiển thị ô nhập mật khẩu mới */}
        {showNewPasswordFields && (
          <form onSubmit={resetPassword} style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="password"
                placeholder="Xác minh mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading} // Vô hiệu hóa khi đang tải
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                backgroundColor: loading ? "#ccc" : "#007BFF",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Đang thay đổi..." : "Đổi mật khẩu"}
            </button>
          </form>
        )}
        <Button size="small" onClick={() => navigate("/account/login")}>
              Quay lại trang đăng nhập
            </Button>
      </div>
    );
  };
  
  export default ResetPasswordForm;
  