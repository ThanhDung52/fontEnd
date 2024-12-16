import React, { useState } from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Router, useNavigate } from "react-router-dom";
import { Divider, Drawer, IconButton, patch, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentition/Action";
import { Flag } from "@mui/icons-material";
import { Dashboard, ShoppingBag,Menu as MenuIcon } from "@mui/icons-material";
import CategoryIcon from '@mui/icons-material/Category';

const menu = [
    {title: "Quản lý doanh thu", icon: <AccountBalanceWalletIcon/>, path:"/"},
    {title: "Quản lý nhà hàng", icon: <RestaurantMenuIcon/>, path:"/restaurant"},
    {title: "Quản lý khách hàng", icon: <PeopleAltIcon/>, path:"/custommer"},
    {title:"Quản lý loại sản phẩm", icon: <CategoryIcon />, path:"/category" },
    {title: "Đăng xuất", icon: <LogoutIcon/> , path:"/"},
  
]

export const AdminSideBar = ({handleColse}) =>{
    const isSmallScreen = useMediaQuery("(max-width:1080px)")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const handleNvavigate = (item) => {
        navigate(`/admins${item.path}`)

        if (item.title == "Đăng xuất") {
            navigate("/")
            dispatch(logout())
            handleColse()
        }
        if (isSmallScreen) {
            setOpen(false)
        }
    }
    const toggleDrawer = () => {
        setOpen(prevOpen => !prevOpen);
    };
    
    return(
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
                           onClick={() => handleNvavigate(item)} 
                          
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