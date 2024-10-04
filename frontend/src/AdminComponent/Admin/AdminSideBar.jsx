
import { Dashboard, ShoppingBag,Menu as MenuIcon } from "@mui/icons-material";
import React, { useState } from "react";
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentition/Action";
import { grey } from "@mui/material/colors";

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Order", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
    { title: "Events", icon: <EventIcon />, path: "/event" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/" }
]

export const AdminSideBar = ({ handleColse }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    
    const handleNavigate = (item) => {
        navigate(`/admin/restaurants${item.path}`)
        if (item.title === "Logout") {
            navigate("/")
            dispatch(logout())
            handleColse()
        }
        if (isSmallScreen) {
            setOpen(false);
        }
    }
    const toggleDrawer = () => {
        setOpen(prevOpen => !prevOpen);
    };
    return (
        <div>
             {isSmallScreen && (
                <IconButton 

                    onClick={toggleDrawer} // Mở drawer khi nhấn vào icon menu
                    sx={{
                        position: 'fixed', 
                        top: 20, 
                        left: 20, 
                        zIndex: 1000,
                        bgcolor: 'primary.main', // Màu nền của biểu tượng
                        color: 'white', // Màu của biểu tượng
                        '&:hover': {
                            bgcolor: 'primary.dark' // Màu nền khi hover
                        },
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
                <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
                    {menu.map((item, i) => (
                        <React.Fragment key={i}>
                            <div 
                                onClick={() => handleNavigate(item)} 
                               
                                className="px-5 flex items-center gap-5 cursor-pointer focus:outline-none" 
                                tabIndex="-1"
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </div>
            </Drawer>
        </div>
    )
}
