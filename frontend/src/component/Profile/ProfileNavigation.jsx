// import React from "react";
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import HomeIcon from '@mui/icons-material/Home';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import EventIcon from '@mui/icons-material/Event';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { AddReaction } from "@mui/icons-material";
// import { Divider, Drawer, useMediaQuery } from "@mui/material";
// import zIndex from "@mui/material/styles/zIndex";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../State/Authentition/Action";

// const menu=[
//     {title:"Orders",icon:<ShoppingBagIcon/>},
//     {title:"Favorites",icon:<FavoriteIcon/>},
//     {title:"Address",icon:<AddReaction/>},
//     {title:"Payments",icon:<AccountBalanceWalletIcon/>},
//     {title:"Notification",icon:<NotificationsActiveIcon/>},
//     {title:"Events",icon:<EventIcon/>},
//     {title:"Logout",icon:<LogoutIcon/>}
// ]

// const ProfileNavigation =({open,handleClose})=>{
//     const isSmallScreen = useMediaQuery('(max-width:800px)');
//     const navigate =  useNavigate();
//     const dispatch = useDispatch();

//     const handleNavigate=(item)=>{
//         if(item.title === "Logout"){
//             navigate("/")
//             dispatch(logout())
          
//         }else{
//             navigate(`/my-profile/${item.title.toLowerCase()}`)
//         }

//     }
//     return(
//         <div>
//             <Drawer 
//             variant={isSmallScreen?"temporary":"permanent"} 
//             onClose={handleClose} 
//             open={isSmallScreen ? open : true} 

//             anchor="left" 
//             sx={{zIndex: -1, position:"sticky"}}
//             >
//                 <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col 
//                 justify-center text-xl gap-8 pt-16 ">
//                     {menu.map((item,i)=><>
//                         <div onClick={()=>handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
//                             {item.icon}
//                             <span>{item.title}</span>
//                         </div>
//                         { i !== menu.length-1 && <Divider/> }
//                     </>)}
//                 </div>
                
//             </Drawer>
//         </div>
//     )
// }
// export default ProfileNavigation

import React, { useState } from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from "@mui/icons-material";
import { Divider, Drawer, CircularProgress, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentition/Action";

const menu = [
    { title: "Orders", displayTitle: "Đơn hàng", icon: <ShoppingBagIcon /> },
    { title: "Favorites", displayTitle: "Yêu thích", icon: <FavoriteIcon /> },
    { title: "Address", displayTitle: "Tài khoản", icon: <AddReaction /> },
    { title: "Payments", displayTitle: "Thanh toán", icon: <AccountBalanceWalletIcon /> },
    { title: "Notification", displayTitle: "Thông báo", icon: <NotificationsActiveIcon /> },
    { title: "Events", displayTitle: "Sự kiện", icon: <EventIcon /> },
    { title: "Logout", displayTitle: "Đăng xuất", icon: <LogoutIcon /> },
];

const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery('(max-width:800px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            setLoading(true);
            setTimeout(() => {
                dispatch(logout());
                navigate("/");
                setLoading(false);
            }, 2000);
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
    };

    return (
        <div>
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                open={isSmallScreen ? open : true}
                anchor="left"
                sx={{ zIndex: -1, position: "sticky" }}
            >
                <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16">
                    {menu.map((item, i) => (
                        <React.Fragment key={i}>
                            <div
                                onClick={() => handleNavigate(item)}
                                className="px-5 flex items-center space-x-5 cursor-pointer hover:bg-gray-100 hover:text-blue-600 transition duration-300 ease-in-out"
                            >
                                {item.icon}
                                <span>{item.displayTitle}</span>
                                {item.title === "Logout" && loading && (
                                    <CircularProgress size={20} sx={{ marginLeft: "1rem" }} />
)}
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

export default ProfileNavigation;