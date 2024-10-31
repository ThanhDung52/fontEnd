import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Chip, Icon, IconButton, Typography, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { isPresentInFavorites } from "../../component/Config/logic";
import StarIcon from '@mui/icons-material/Star';
import { deleteRestaurant } from "../../component/State/Restaurant/Action";


export const RestaurantCart =({item}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth, restaurants } = useSelector((store) => store);
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
                    {rating} ({item.reviewCount} 29 )
                </Typography>
            </Box>
        );
    };


    useEffect(() => {
        // Nếu trạng thái auth hoặc restaurants thay đổi, sẽ cập nhật giao diện ngay lập tức
    }, [auth, restaurants]);

    const handleSeeMore = () => {
        setShowFullDescription(!showFullDescription);
    };

    const hanleAddToFavorite = () => {
    }


    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    }

    const handleDeleteRestaurant= (restaurantId)=>{
        dispatch(deleteRestaurant({restaurantId,jwt}))
    }


    return(
        <Accordion disableGutters>
        <AccordionSummary>
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center w-full gap-4 p-4">
                {/* Hình ảnh nhà hàng */}
                <div className="relative w-full h-[10rem]">
                    <img
                        className="w-full h-[10rem] rounded-md object-cover"
                        src={item.images[0]
                        }
                        alt=""
                        style={{
                            objectFit: "cover",
                            width: '50rem',      // Đặt chiều rộng là 100% để chiếm toàn bộ không gian
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

                {/* Phần Nội dung */}
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
                    

                    {/* Chữ "Danh" và nút Xóa cùng dòng */}
                    <div className="flex justify-between items-center w-full mt-4">
                        <span className="text-gray-300">
                            
                        {renderStars(item.rating)} {/* Hiển thị đánh giá sao */}
                            
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
    )
}