import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { createIngredientCategory } from "../../component/State/Ingredients/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch();
    const { restaurant, loading } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");

    const [formData, setFormData] = useState({ name: "" });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Tên danh mục không được để trống.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const data = { name: formData.name, restaurantId: restaurant.userRestaurant.id };

        dispatch(createIngredientCategory({ data, jwt }))
            .then(() => {
                toast.success("Thêm danh mục nguyên liệu thành công!", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setFormData({ name: "" }); // Reset form
            })
            .catch(() => {
                toast.error("Thêm danh mục nguyên liệu không thành công. Vui lòng thử lại.", {
                    position: "top-center",
                    autoClose: 3000,
                });
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="p-5">
            <Typography variant="h5" className="text-center pb-5">
                Tạo danh mục nguyên liệu
            </Typography>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Tên danh mục"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    style={{ marginTop: "10px" }}
                >
                    Tạo danh mục
                </Button>
            </form>
            {/* ToastContainer để hiển thị thông báo */}
            <ToastContainer />
        </div>
    );
};