import { Card, Chip, Icon, IconButton, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../State/Authentition/Action";
import { isPresentInFavorites } from "../Config/logic";

const RestaurantCart = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth, restaurants } = useSelector((store) => store);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const theme = useTheme(); // Lấy theme hiện tại

    useEffect(() => {
        // Nếu trạng thái auth hoặc restaurants thay đổi, sẽ cập nhật giao diện ngay lập tức
    }, [auth, restaurants]);

    const handleSeeMore = () => {
        setShowFullDescription(!showFullDescription);
    };

    const hanleAddToFavorite = () => {
        dispatch(addToFavorite({ restaurantId: item.id, jwt }));
    }

    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    }

    return (
        <Card
            className="w-[18rem] h-[26rem]"
            sx={{
                backgroundColor: theme.palette.background.paper, // Màu nền cho Card
                color: theme.palette.text.primary, // Màu chữ
                border: `2px solid ${theme.palette.divider}`, // Viền
            }}
        >
            <div className="cursor-pointer relative">
                <img
                    className="w-full h-[10rem] rounded-t-md object-cover" // Sử dụng các lớp CSS để điều chỉnh kích thước
                    src={item.images[2]}
                    alt=""
                    style={{
                        width: '100%',      // Đặt chiều rộng là 100% để chiếm toàn bộ không gian
                        height: '10rem',    // Đặt chiều cao cố định
                        objectFit: 'cover',  // Giữ tỷ lệ và cắt hình ảnh nếu cần để lấp đầy khung
                    }}
                />
                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color={item.open ? "success" : "error"}
                    label={item.open ? "open" : "closed"}
                />
            </div>
            <div className="p-4 textPart flex flex-col w-full justify-between">
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <p onClick={handleNavigateToRestaurant} className="font-semibold text-lg cursor-pointer">
                            {item.name}
                            {item.title}
                        </p>
                        <IconButton onClick={hanleAddToFavorite}>
                            {isPresentInFavorites(auth.favorites, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </div>
                    <p className={`text-gray-400 text-sm ${!showFullDescription ? 'overflow-hidden max-h-[6rem] text-ellipsis' : ''}`}>
                        {item.description}
                    </p>
                    {item.description.length > 100 && (
                        <span className="text-blue-500 cursor-pointer" onClick={handleSeeMore}>
                            {showFullDescription ? "Thu gọn" : "Xem thêm"}
                        </span>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default RestaurantCart;
