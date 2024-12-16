

import { Dashboard, ShoppingBag, Menu as MenuIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../component/State/Authentition/Action";

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Order", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    // { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
    { title: "Events", icon: <EventIcon />, path: "/event" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/" }
];

export const AdminSideBar = ({ handleColse }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation(); // Lấy URL hiện tại
    const [open, setOpen] = useState(false);

    // Lấy thông tin tên người dùng từ Redux hoặc localStorage
    const user = useSelector((store) => store.auth.user);
    const userName = user ? user.fullname
    : "User";

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            navigate("/");
            dispatch(logout());
            handleColse();
        } else {
            navigate(`/admin/restaurants${item.path}`);
        }

        if (isSmallScreen) {
            setOpen(false);
        }
    };

    const toggleDrawer = () => {
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <div>
            {isSmallScreen && (
                <IconButton 
                    onClick={toggleDrawer}
                    sx={{
                        position: 'fixed',
                        top: 20,
                        left: 20,
                        zIndex: 1000,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClick={handleColse}
                open={open}
                anchor="left"
                sx={{ zIndex: 1 }}
            >
                <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-start text-xl">
                    {/* Phần Welcome */}
                    <div className="px-5 py-4 text-center font-bold text-lg">
                        Welcome, {userName}!
                    </div>
                    <Divider />
                    {/* Danh sách menu */}
                    <div className="space-y-[0.65rem]">
                        {menu.map((item, i) => (
                            <React.Fragment key={i}>
                                <div 
                                    onClick={() => handleNavigate(item)} 
                                    className={`px-5 py-3 flex items-center gap-5 cursor-pointer rounded-lg 
                                        ${location.pathname === `/admin/restaurants${item.path}` 
                                            ? "bg-primary-main text-b bg-[#e91e63]  " 
                                            : "hover:bg-[#e91e63]"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>
                                {i !== menu.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
