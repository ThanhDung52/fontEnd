import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { createIngredientCategory } from "../../component/State/Ingredients/Action";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../Notification/Notification";


export const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch()
    const {restaurant, loading, error} = useSelector(store =>store)
    const jwt = localStorage.getItem("jwt")
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [formData, setFormData] = useState({ 
        name: ""
    })
    const handleSubmit = (e) => {
     e.preventDefault()
     const data = {name:formData.name, restaurantId: restaurant.userRestaurant.id}
        // console.log(formData);
        
        dispatch(createIngredientCategory({data:data,jwt}))
        if (!error) {
            setMessage("Thêm IngredietnCategory thành công");
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        } else {
            setMessage("Thêm IngredientCategory không thành công. Vui lòng thử lại.");
            setShowNotification(true);
        }
        
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
    return (
        <div className="">
            <div className="p-5">
                <h1 className="text-gray-400 text-center text-xl pb-10">Create Ingredient Category</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id="name"
                        name="name"
                        label="Category"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.name}
                    >

                    </TextField>
                    <Button variant="contained" type="submit" >
                        Create Category
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

