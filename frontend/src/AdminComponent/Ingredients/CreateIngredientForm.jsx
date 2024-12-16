import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient, createIngredientCategory } from "../../component/State/Ingredients/Action";
import Notification from "../Notification/Notification";


export const CreateIngredientForm = () => {
    const { restaurant, ingredients, loading, error } = useSelector((store) => store)
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const [formData, setFormData] = useState({ name: "", categoryId: "" })
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            ...formData,
            restaurantId: restaurant.userRestaurant.id
        }
        dispatch(createIngredient({ data, jwt }))
        // console.log("FoodCategory Data", data);


        if (!error) {
            setMessage("Thêm mới Ingredient thành công");
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        } else {
            setMessage("Thêm mới Ingredient không thành công. Vui lòng thử lại.");
            setShowNotification(true);
        }

    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
        <div className="">
            <div className="p-5">
                <h1 className="text-gray-400 text-center text-xl pb-10">Thêm thành phần</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id="name"
                        name="name"
                        label="Tên thành phần"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.name}
                    >

                    </TextField>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.categoryId}
                            label="category"
                            onChange={handleInputChange}
                            name="categoryId"
                        >
                            {ingredients.category.map((item) =>
                                <MenuItem value={item.id}>{item.name}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                    <Button variant="contained" type="submit" >
                        Thêm mới
                    </Button>
                    {showNotification && (
                        <Notification
                            message={message}
                            type={error ? "error" : "success"}
                            onClose={() => setShowNotification(false)}
                        />
                    )}
                </form>
            </div>
        </div>
    )
}

