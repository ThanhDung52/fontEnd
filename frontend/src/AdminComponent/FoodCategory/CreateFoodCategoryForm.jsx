import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../component/State/Restaurant/Action";
import Notification from "../Notification/Notification";

const CreateFoodCategoryForm = () => {
    const {restaurant, loading, error} = useSelector((store) => store);
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);


    const [formData, setFormData] = useState({ categoryName: "", restaurantId: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.categoryName,
            restaurantId: {
                id: 1
            }
        }
        dispatch(createCategoryAction({reqData:data,jwt:localStorage.getItem("jwt")}))
        console.log("FoodCategory Data", data);
        

        if (!error) {
            setMessage("Update thành công");
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        } else {
            setMessage("Cập nhật không thành công. Vui lòng thử lại.");
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
                <h1 className="text-gray-400 text-center text-xl pb-10">Create Food  Category</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id="categoryName"
                        name="categoryName"
                        label="Food Category"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.catogory}
                    >

                    </TextField>
                    <Button variant="contained" type="submit" >
                        Create Food Category
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

export default CreateFoodCategoryForm