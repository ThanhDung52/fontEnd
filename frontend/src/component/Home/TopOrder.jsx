import { Card, CardMedia, useTheme } from "@mui/material";
import React from "react";

const TopOrder = ({ food, specialCard }) => {
    const theme = useTheme();
    
    return (
        <Card
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "16px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.3)",
                },
            }}
        >
            {/* Card Image */}
            <CardMedia
                component="img"
                src={food.images}
                alt={food.name}
                sx={{
                    width: "100%",
                    height: "200px", // Height giảm nhẹ
                    objectFit: "cover",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    transition: "transform 0.3s ease", // Thêm hiệu ứng hover cho hình ảnh
                    "&:hover": {
                        transform: "scale(1.1)", // Zoom ảnh khi hover
                    },
                }}
            />
            <div className="p-4 relative">
                {/* Food Name */}
                <h3 className="food-name text-xl font-semibold text-gray-800 mb-2">{food.name}</h3>
                
                {/* Food Description */}
                <p className="food-description text-gray-600 mb-2">{food.description}</p>
                
                {/* Food Price */}
                <p className="food-price text-lg font-bold text-gray-700 mb-2">{food.price} VND</p>
                
                {/* Food Orders */}
                <p className="food-orders text-sm text-gray-500">Orders: {food.orders}</p>

                {/* Special Badge for Top Order */}
                {specialCard && (
                    <span className="top-ordered-badge bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold absolute top-3 right-3">
                        Top Order
                    </span>
                )}

                {/* Product Badge */}
                <div className="category-badge mt-4 flex items-center">
                    {food.isHot && (
                        <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mr-2">
                            Hot Deal
                        </span>
                    )}
                    {food.isBestSeller && (
                        <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mr-2">
                            Best Seller
                        </span>
                    )}
                    {food.isFeatured && (
                        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mr-2">
                            Featured
                        </span>
                    )}
                    {food.isNewArrival && (
                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            New Arrival
                        </span>
                    )}
                </div>

                {/* Hover Effect or Quick View Button */}
                <div className="absolute bottom-4 left-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-transform transform hover:scale-105">
                        Quick View
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default TopOrder;
