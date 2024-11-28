import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOGOUT } from "../State/Authentition/ActionType";
import { useNavigate } from "react-router-dom";
import { api } from "../Config/api";

export const Address = () => {
    const { auth } = useSelector((store) => store);
    const token = auth.token || localStorage.getItem("jwt"); // Lấy token từ Redux hoặc localStorage
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Token:", token);

    // State để lưu thông tin người dùng
    const [customer, setCustomer] = useState({
        fullname: auth.user?.fullname || "Chưa có thông tin",
        email: auth.user?.email || "Chưa có thông tin",
        phone: auth.user?.addresses?.map((address) => address?.postalCode) || "Chưa có thông tin",
        address: auth.user?.addresses?.map((address) => address?.city) || "Chưa có thông tin",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        setCustomer({
            fullname: auth.user?.fullname || "Chưa có thông tin",
            email: auth.user?.email || "Chưa có thông tin",
            phone: auth.user?.addresses?.[0]?.postalCode || "Chưa có thông tin",
            address: auth.user?.addresses?.[0]?.city || "Chưa có thông tin",
        });
    }, [auth.user]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCustomer({
                    fullname: response.data.fullname || "Chưa có thông tin",
                    email: response.data.email || "Chưa có thông tin",
                    phone: response.data.phone || "Chưa có thông tin",
                    address: response.data.addresses?.[0]?.city || "Chưa có thông tin",
                });
            } catch (error) {
                console.error("Lỗi khi tải thông tin người dùng:", error);
            }
        };
    
        if (!auth.user) {
            fetchData(); // Tải lại thông tin nếu cần thiết
        }
    }, []);
        
    const updateUserInfo = async (token, customer) => {
        try {
            // Gửi yêu cầu PUT để cập nhật thông tin người dùng
            const response = await axios.put("http://localhost:8080/api/users/update", customer, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Thông tin đã được cập nhật!dữ liệu sẽ được cập nhật trong giây lát");

            // Cập nhật lại dữ liệu nếu cần
            setCustomer({
                fullname: response.data.fullname || customer.fullname,
                email: response.data.email || customer.email,
                phone: response.data.phone || customer.phone,
                address: response.data.addresses?.[0]?.city || customer.address,
            });

            // Reload lại trang sau khi cập nhật
          // Thực hiện reload trang
          window.location.reload(10000);

            return response.data;  // Trả dữ liệu nếu cần xử lý sau này
        } catch (error) {
            alert("Cập nhật thông tin thất bại: " + (error.response?.data?.message || "Lỗi không xác định"));
        }
    };

    const handleUpdate = () => {
        if (isEditing) {
            updateUserInfo(token, customer);  // Gọi hàm cập nhật thông tin
        }
        setIsEditing(!isEditing);  // Chuyển trạng thái chế độ chỉnh sửa
    };

    const handlePasswordUpdate = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("Mật khẩu mới không khớp!");
            return;
        }

        try {
            const response = await api.post(
                `/api/users/change-password`,
                {
                    email: auth.user.email,
                    oldPassword: passwords?.currentPassword,
                    newPassword: passwords?.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // token từ Redux hoặc Context
                    },
                }
            );

            alert("Mật khẩu đã được thay đổi!");
            setShowChangePassword(false);
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            localStorage.removeItem("jwt"); // Xoá token
            window.location.href = "/"; // Chuyển hướng đến trang chính
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi";
            alert(`Lỗi: ${errorMessage}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Thông Tin Cá Nhân</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Họ và tên:</label>
                        <input
                            type="text"
                            name="fullname"
                            value={customer.fullname}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                            disabled
                            className={`w-full px-3 py-2 border rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            value={customer.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleUpdate}
                        className={`w-full py-2 mt-4 text-white rounded-lg ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {isEditing ? "Lưu" : "Cập nhật thông tin"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="w-full py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                        Thay đổi mật khẩu
                    </button>
                </form>

                {showChangePassword && (
                    <form className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Mật khẩu hiện tại:</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded-md bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Mật khẩu mới:</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded-md bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Xác nhận mật khẩu mới:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded-md bg-white"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handlePasswordUpdate}
                            className="w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                        >
                            Lưu mật khẩu
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Address;
