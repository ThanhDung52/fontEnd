// import React from "react";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../State/Authentition/Action";
// import { useNavigate } from "react-router-dom";
// import { store } from "../State/store";

// const UserProfile = () => {
//     const { auth } = useSelector(store => store);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleNavigate = (item) => {
//         if (!item || !item.title) {
//             // Nếu item hoặc item.title không tồn tại, trả về sớm
//             console.error("Item or item.title is undefined");
//             return;
//         }

//         if (item.title === "Logout") {
//             dispatch(logout());
//             navigate("/");
//         } else {
//             navigate(`/my-profile/${item.title.toLowerCase()}`);
//         }
//     };

//     return (
//         <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
//             <div className="flex flex-col items-center justify-center">
//                 <AccountCircleIcon sx={{ fontSize: "9rem" }} />
//                 <h1 className="py-5 text-2xl font-semibold"> {auth.user?.fullname.toUpperCase()}</h1>
//                 <p>Email: {auth.user?.email.toUpperCase()} </p>
//                 <Button variant="contained" onClick={() => handleNavigate({ title: "Logout" })} sx={{ margin: "2rem 0rem" }}>Logout</Button>
//                 {/* Thêm các button khác để kiểm tra điều hướng */}
//                 {/* <Button variant="contained" onClick={() => handleNavigate({ title: "Profile" })}>Profile</Button> */}
//             </div>
//         </div>
//     );
// };

// export default UserProfile;


import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Authentition/Action";
import { useNavigate } from "react-router-dom";
import { store } from "../State/store";

const UserProfile = () => {
    const { auth } = useSelector(store => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleNavigate = (item) => {
        if (!item || !item.title) {
            console.error("Item or item.title is undefined");
            return;
        }

        if (item.title === "Logout") {
            setLoading(true); // Hiện hiệu ứng loading
            setTimeout(() => {
                dispatch(logout());
                navigate("/");
            }, 2000); // Thời gian giả lập chờ hiệu ứng (2 giây)
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center justify-center">
                <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                <h1 className="py-5 text-2xl font-semibold">{auth.user?.fullname.toUpperCase()}</h1>
                <p>Email: {auth.user?.email.toUpperCase()}</p>
                {loading ? (
                    <CircularProgress sx={{ margin: "2rem 0rem" }} />
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => handleNavigate({ title: "Logout" })}
                        sx={{ margin: "2rem 0rem" }}
                    >
                        Logout
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UserProfile;