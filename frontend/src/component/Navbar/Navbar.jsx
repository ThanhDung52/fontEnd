import { Avatar, Badge, Box, IconButton, Switch } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css"

export const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { auth, cart } = useSelector((store) => store);
    const navigate = useNavigate();
    const itemCount = (cart.cartItems && cart.cartItems.length) || 0;
    
    // Thêm state cho thanh tìm kiếm
    const [showSearch, setShowSearch] = useState(false);

    const handleAvatarClick = () => {
        if (auth.user && auth.user.role === "ROLE_CUSTOMER") {
            navigate("/my-profile");
        } else {
            navigate("/admin/restaurants");
        }
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <Box className="px-5 sticky top-0 z-[100] py-[.8rem] bg-[#e31837] lg:px-20 flex justify-between">
            <div className="flex items-center space-x-4">
                <div className="lg:mr-10 cursor-pointer flex items-center">
                    <li className="logo font-semibold text-gray-300 text-2xl" onClick={() => navigate("/")}>
                        TTD food 
                    </li>
                </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-10">
                {/* Thanh tìm kiếm */}
                {showSearch && (
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        className="border rounded-md px-2 py-1" 
                        onBlur={() => setShowSearch(false)} // Ẩn khi mất tiêu điểm
                    />
                )}
                <div>
                    <IconButton onClick={toggleSearch}>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div>
                <div>
                    {auth.user ? (
                        <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: pink[400] }}>
                            {auth.user.fullname ? auth.user.fullname[0].toUpperCase() : ""}
                        </Avatar>
                    ) : (
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Person />
                        </IconButton>
                    )}
                </div>
                <div>
                    <IconButton onClick={() => navigate("/cart")}>
                        <Badge color="primary" badgeContent={itemCount}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                        </Badge>
                    </IconButton>
                </div>
                <div>
                    <Switch 
                        checked={darkMode} 
                        onChange={toggleDarkMode} 
                        inputProps={{ 'aria-label': 'controlled' }} 
                    />
                </div>
            </div>
        </Box>
    );
};
