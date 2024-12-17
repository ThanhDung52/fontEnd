import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../component/State/Ingredients/Action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateIngredientForm = () => {
    const { restaurant, ingredients, loading } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const [formData, setFormData] = useState({ name: "", categoryId: "" });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Tên không được để trống.";
        }
        if (!formData.categoryId) {
            errors.categoryId = "Vui lòng chọn danh mục.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Trả về true nếu không có lỗi
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Dừng nếu form không hợp lệ

        const data = {
            ...formData,
            restaurantId: restaurant.userRestaurant.id,
        };

        dispatch(createIngredient({ data, jwt }))
            .then(() => {
                toast.success("Thêm mới nguyên liệu thành công!", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setFormData({ name: "", categoryId: "" }); // Reset form
            })
            .catch(() => {
                toast.error("Thêm mới nguyên liệu không thành công. Vui lòng thử lại.", {
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
            <h1 className="text-gray-400 text-center text-xl pb-10">Tạo nguyên liệu mới</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Tên nguyên liệu"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                    error={!!formErrors.name} // Hiển thị lỗi
                    helperText={formErrors.name} // Thông báo lỗi
                />
                <FormControl fullWidth error={!!formErrors.categoryId}>
                    <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                    <Select
labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.categoryId}
                        label="Danh mục"
                        onChange={handleInputChange}
                        name="categoryId"
                    >
                        {ingredients.category.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {formErrors.categoryId && (
                        <Typography variant="caption" color="error">
                            {formErrors.categoryId}
                        </Typography>
                    )}
                </FormControl>
                <Button variant="contained" type="submit" disabled={loading}>
                    Tạo nguyên liệu
                </Button>
            </form>
            {/* Thêm ToastContainer để hiển thị thông báo */}
            <ToastContainer />
        </div>
    );
};