import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import { getrestaurantrevenue } from "../../component/State/Restaurant/Action";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector((store) => store);
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

    // Nhóm tất cả doanh thu của tất cả nhà hàng 
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

    // Tính tổng doanh thu theo tháng cho tất cả các nhà hàng
    const totalMonthlyRevenue = Array(12).fill(0); // Khởi tạo mảng 12 tháng với giá trị 0
    Object.values(groupedOrders).forEach((restaurant) => {
        restaurant.monthlyRevenue.forEach((revenue, index) => {
            totalMonthlyRevenue[index] += revenue || 0; // Cộng dồn doanh thu theo từng tháng
        });
    });

    // Tạo dữ liệu cho biểu đồ đường
    const chartData = totalMonthlyRevenue.map((amount, index) => ({
        month: `Tháng ${index + 1}`,
        totalAmount: amount,
    }));

    // Tạo dữ liệu cho biểu đồ hình tròn
    const pieChartData = Object.entries(groupedOrders).map(([restaurantName, { totalRevenue }]) => ({
        name: restaurantName,
        totalAmount: totalRevenue,
    }));

    const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

    return (
        <Box sx={{ marginTop: '2rem' }}>
            <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                <Select
                    sx={{ margin: 2 }}
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Chọn tháng' }} // Thêm thuộc tính aria-label để hỗ trợ truy cập
                >
                    <MenuItem value={0}>Tất cả các tháng</MenuItem>
                    {[...Array(12)].map((_, index) => (
                        <MenuItem value={index + 1} key={index}>Tháng {index + 1}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="space-y-8">
                {/* Biểu đồ thống kê đơn hàng */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <TrendingUpIcon className="text-green-500 mr-2" style={{ fontSize: 32 }} />
                        <h2 className="text-xl font-semibold">Thống kê doanh thu hàng tháng</h2>
                    </div>

                    {/* Biểu đồ đường */}
                    <div className="p-4">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="totalAmount" stroke="#4F46E5" name="Tổng doanh thu" dot={{ r: 6 }} activeDot={{ r: 8 }} />
                                {totalMonthlyRevenue}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex flex-row">
                        {/* Biểu đồ hình tròn */}
                        <div className="p-4" style={{ width: '50%' }}>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        dataKey="totalAmount"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        fill="#4F46E5"
                                        label
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Biểu đồ hình cột */}
                        <div className="p-4" style={{ width: '50%' }}>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={pieChartData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="totalAmount" fill="#4F46E5" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row pt-2 py-2">
                {Object.entries(groupedOrders).length > 0 ? (
                    Object.entries(groupedOrders).map(([restaurantName, { totalRevenue, monthlyRevenue }]) => (
                        <div className="basic 1/2 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={restaurantName}>
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img className="h-48 w-full object-cover md:w-48" src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Placeholder image" />
                                </div>
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{restaurantName}</div>
                                    <p className="mt-2 text-gray-500">{selectedMonth === 0 ? "Doanh thu tổng các tháng" : `Doanh thu Tháng ${selectedMonth}`}:
                                        {selectedMonth === 0
                                            ? calculateTotalAllMonths(monthlyRevenue) // Tổng doanh thu của tất cả các tháng
                                            : (monthlyRevenue[selectedMonth - 1] || 0)
                                        }
                                    </p>
                                    <p className="mt-2 text-gray-500">Doanh thu tổng:
                                        {totalRevenue || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Không có nhà hàng nào</div>
                )}
            </div>
        </Box>
    );
};
