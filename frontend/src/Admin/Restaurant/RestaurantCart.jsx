import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Typography, useTheme } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { deleteRestaurant } from "../../component/State/Restaurant/Action";

export const RestaurantCart = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const theme = useTheme();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const renderStars = (rating) => {
        return (
            <Box display="flex" alignItems="center">
                {Array.from({ length: 4 }, (_, i) => (
                    <StarIcon key={i} color="primary" />
                ))}
                <StarIcon key={5} color="disabled" />
                <Typography variant="body2" sx={{ marginLeft: 1, color: theme.palette.text.secondary }}>
                    {rating} ({item.reviewCount} reviews)
                </Typography>
            </Box>
        );
    };

    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    }

    const handleDeleteRestaurant = async (restaurantId) => {
        try {
            await dispatch(deleteRestaurant({ restaurantId, jwt }));
            console.log("Nhà hàng đã được xóa thành công.");
        } catch (error) {
            console.error("Có lỗi xảy ra khi xóa nhà hàng:", error);
        }
    };
    

    return (
        <Accordion disableGutters>
            <AccordionSummary>
                <div className="relative flex flex-col lg:flex-row items-start lg:items-center w-full gap-4 p-4">
                    <div className="relative w-full h-[10rem]">
                        <img
                            className="w-full h-[10rem] rounded-md object-cover"
                            src={item.images[0]}
                            alt=""
                            style={{
                                objectFit: "cover",
                                width: '50rem',
                                height: '10rem',
                            }}
                        />
                        <Chip
                            size="small"
                            className="absolute top-4 left-4"
                            color={item.open ? "success" : "error"}
                            label={item.open ? "Open" : "Closed"}
                        />
                    </div>
                    <div className="flex flex-col w-full lg:w-2/3 ">
                        <p
                            onClick={handleNavigateToRestaurant}
                            className="font-semibold text-lg cursor-pointer hover:underline"
                        >
                            {item.name} - {item.owner.fullname}
                        </p>
                        <p className="text-gray-300 text-sm">
                            {item.description}
                        </p>
                        <p>
                            {item.openingHours}
                        </p>
                        <div className="flex justify-between items-center w-full mt-4">
                            <span className="text-gray-300">
                                {renderStars(item.rating)}
                            </span>
                            <Button
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => handleDeleteRestaurant(item.id)}
                            >
                                Xóa
                            </Button>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
        </Accordion>
    );
}
