import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { addItemToCart } from "../State/Cart/Action";

const Food = ({ food }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { foods } = useSelector((store) => store);
    const theme = useTheme();
    const [selectedIngredients, setselectrdIngredients] = useState([])
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {}, [foods]);

    const renderStars = (rating) => {
        return (
            <Box display="flex" alignItems="center">
                {Array.from({ length: 4 }, (_, i) => (
                    <StarIcon key={i} color="primary" />
                ))}
                <StarIcon key={5} color="disabled" />
                <Typography variant="body2" sx={{ marginLeft: 1, color: theme.palette.text.secondary }}>
                    {rating} ({food.reviewCount} đánh giá)
                </Typography>
            </Box>
        );
    };
    const handleAddItemToCart = (e) => {
        e.preventDefault()
        const reqData = {

            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: food.id,
                quantity: 1,
                ingredients: selectedIngredients,
            }
        }
        dispatch(addItemToCart(reqData))
        console.log("reqData", reqData);

       

    }


    return (
        <Card
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `2px solid ${theme.palette.divider}`,
                opacity: expanded ? 0.7 : 1,
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseEnter={handleExpandClick}
            onMouseLeave={handleExpandClick}
            
        >
            <CardMedia
                component="img"
                image={food.images[0]}
                alt="Food dish"
                sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                }}
            />

            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                        {food.name}
                    </Typography>
                    {renderStars(food.rating)} {/* Hiển thị đánh giá sao */}
                </Box>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold', marginLeft: '16px' }}>
                    ${food.price}
                </Typography>
            </CardContent>

            <Box
              onClick={handleAddItemToCart} 
                sx={{
                    position: 'absolute',
                    bottom: expanded ? '10px' : '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    transition: 'bottom 0.7s ease, opacity 0.3s ease',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    padding: '12px 24px',
                    borderRadius: '30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    opacity: 1, // Đặt opacity của nút thành 1
                    pointerEvents: 'auto', // Để cho phép tương tác với nút
                    cursor: 'pointer',
                    zIndex: 10,
                    fontSize: '16px',
                }}
                
            >
                Add to Cart
            </Box>
        </Card>
    );
};

export default Food;
