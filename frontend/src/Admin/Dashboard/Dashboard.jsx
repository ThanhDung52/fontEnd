import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";
import { getrestaurantrevenue } from "../../component/State/Restaurant/Action";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const {  restaurant } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    const [selectedMonth, setSelectedMonth] = useState(0); // 0 là tất cả các tháng

    useEffect(() => {
            dispatch(getrestaurantrevenue(jwt));
    }, [jwt, dispatch]);

    console.log("restaurantrevenue", restaurant);
    

    // Kiểm tra restaurant có dữ liệu doanh thu
    const restaurantData = restaurant.restaurantRevenues || []; // Giả định rằng dữ liệu doanh thu là một mảng
    console.log("restaurantData", restaurantData);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    // Hàm tính tổng doanh thu của tất cả các tháng
    const calculateTotalAllMonths = (monthlyRevenue) => {
        return monthlyRevenue?.reduce((acc, revenue) => acc + (revenue || 0), 0);
    };

    // Nhóm doanh thu theo nhà hàng
    const groupedOrders = restaurantData.reduce((acc, order) => {
        const restaurantName = order.restaurantName || "Chưa xác định"; // Lấy tên nhà hàng
        if (!acc[restaurantName]) {
            acc[restaurantName] = {
                totalRevenue: 0,
                monthlyRevenue: order.monthlyRevenue || [],
            };
        }
        acc[restaurantName].totalRevenue += order.totalRevenue || 0;
        return acc;
    }, {});

    return (
        <Box sx={{ marginTop: '2rem' }}>
            <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                <InputLabel>Chọn tháng</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange} label="Chọn tháng">
                    <MenuItem value={0}>Tất cả các tháng</MenuItem>
                    {[...Array(12)].map((_, index) => (
                        <MenuItem value={index + 1} key={index}>Tháng {index + 1}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <TableContainer sx={{ boxShadow: 3, borderRadius: '10px', overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Tên nhà hàng</TableCell>
                            <TableCell align="right">
                                {selectedMonth === 0 ? "Doanh thu tổng các tháng" : `Doanh thu Tháng ${selectedMonth}`}
                            </TableCell>
                            <TableCell align="right">Doanh thu tổng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(groupedOrders).length > 0 ? (
                            Object.entries(groupedOrders).map(([restaurantName, { totalRevenue, monthlyRevenue }]) => (
                                <TableRow key={restaurantName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{restaurantName}</TableCell>
                                    {/* Hiển thị doanh thu tổng các tháng hoặc doanh thu của tháng đã chọn */}
                                    <TableCell align="right">
                                        {selectedMonth === 0
                                            ? calculateTotalAllMonths(monthlyRevenue) // Tổng doanh thu của tất cả các tháng
                                            : (monthlyRevenue[selectedMonth - 1] || 0)
                                        }
                                    </TableCell>
                                    {/* Hiển thị tổng doanh thu của nhà hàng */}
                                    <TableCell align="right">{totalRevenue || 0}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">Không có đơn hàng nào</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
