import React from 'react'; 
import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar/Navbar';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentition/Action';
import { findCart } from './component/State/Cart/Action';
import Routers from './Routers/Routers';
import { lightTheme } from './Theme/LightTheme';
import { getRestaurantById, getRestaurantByUserId } from './component/State/Restaurant/Action';
import { useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? savedTheme === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    // Toggle chức năng chuyển chế độ
    const handleThemeChange = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode); // Lưu trạng thái theme vào localStorage
    };

    // Lấy trạng thái theme từ localStorage khi tải trang
    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedTheme);
    }, []);

    useEffect(() => {
        dispatch(getUser(auth.jwt || jwt));
        dispatch(findCart(jwt));
    }, [auth.jwt]);

    useEffect(()=>{
        dispatch(getRestaurantByUserId(auth.jwt || jwt))
    },[auth.user])
    const hideNavbarRoutes = ['/admin', '/admins'];
    const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));


    return (
       
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            {!shouldHideNavbar && (
                <Navbar darkMode={darkMode} toggleDarkMode={handleThemeChange} />
            )}            <Routers />
        </ThemeProvider>
       
    );
}

export default App;
