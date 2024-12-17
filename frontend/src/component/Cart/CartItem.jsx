import { Chip, IconButton, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeCartItem, updateCariItem } from "../State/Cart/Action";

const CartItem = ({ item }) => {
    const { auth, cart } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const theme = useTheme();

    // const handleUpdateCartItem = (value) => {
    //     if (value === -1 && item.quantity === 1) {
    //         handleRemoveCartItem();
    //     } else if (value !== 0) { // Tránh cập nhật nếu không có thay đổi số lượng
    //         const data = { cartItemId: item.id, quantity: item.quantity + value };
    //         dispatch(updateCariItem({ data, jwt }));
    //     }
    // };

    const handleUpdateCartItem = (value) => {
        if (value === -1 && item.quantity === 1) {
            handleRemoveCartItem();
        } else if (value !== 0) { // Tránh cập nhật nếu không có thay đổi số lượng
            const newQuantity = item.quantity + value;
            const data = { 
                cartItemId: item.id, 
                quantity: newQuantity 
            };
            dispatch(updateCariItem({ data, jwt }));
        }
    };
    

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
    };

    return (
        <div className="px-5">
            <div className="lg:flex items-center lg:space-x-5">
                <div>
                    <img className="w-[7rem] h-[7rem] object-cover"
                        src={item?.food.images[0]}
                        alt={item.food.name}
                    />
                </div>

                <div className="flex items-center justify-between lg:w-[70%]">
                    <div className="space-y-1 lg:space-y-3 w-full" style={{ color: theme.palette.text.primary }}>
                        <p>{item.food.name}</p>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className="w-5 h-5 text-xs flex items-center justify-center">
                                    {item.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    <p>${item.totalPrice}</p>
                </div>
            </div>
            <div className="flex justify-end mt-1">
                <IconButton
                    size="small"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'red',
                        },
                    }}
                    onClick={handleRemoveCartItem}
                >
                    <DeleteIcon sx={{ fontSize: "1.5rem", color: theme.palette.error.main }} />
                </IconButton>
            </div>

            <div className="pt-1 space-x-2 mb-9">
                {item.ingredients.map((ingredient, index) => (
                    <Chip key={index} label={ingredient} />
                ))}
            </div>
        </div>
    );
};

export default CartItem;