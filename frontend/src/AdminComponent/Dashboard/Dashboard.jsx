import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Paper } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (restaurant.userRestaurant?.id && jwt) {
      dispatch(fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.userRestaurant.id,
      }));
    }
  }, [restaurant.userRestaurant?.id, jwt, dispatch]);

  const getMonthlyOrderData = () => {
    const data = {};
    let totalRevenue = 0;

    if (restaurantOrder.orders) {
      restaurantOrder.orders.forEach((order) => {
        const orderDate = new Date(order.orderDate);
        const yearMonth = `${orderDate.getFullYear()}-${(orderDate.getMonth() + 1).toString().padStart(2, '0')}`;
        const orderTotal = order.totalPrice || 0;

        if (!data[yearMonth]) {
          data[yearMonth] = {
            month: yearMonth,
            totalOrders: 0,
            totalAmount: 0,
            orders: []
          };
        }
        data[yearMonth].totalOrders++;
        data[yearMonth].totalAmount += orderTotal;
        data[yearMonth].orders.push({
          date: orderDate.toLocaleDateString(),
          price: orderTotal,
        });

        totalRevenue += orderTotal;
      });
    }

    return {
      monthlyData: Object.keys(data).map(key => ({
        month: key,
        totalOrders: data[key].totalOrders,
        totalAmount: data[key].totalAmount,
        orders: data[key].orders,
      })),
      totalRevenue
    };
  };

  const { monthlyData, totalRevenue } = useMemo(getMonthlyOrderData, [restaurantOrder.orders]);

  return (
    <div className="space-y-8">
      {/* Biểu đồ thống kê đơn hàng */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingUpIcon className="text-green-500 mr-2" style={{ fontSize: 32 }} />
          <h2 className="text-xl font-semibold">Monthly Order Statistics</h2>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalAmount" stroke="#4F46E5" name="Total Amount" dot={{ r: 6 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bảng thống kê đơn hàng theo từng tháng */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <ReceiptIcon className="text-yellow-500 mr-2" style={{ fontSize: 32 }} />
          <h2 className="text-xl font-semibold">Monthly Order Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-4 border-b border-gray-300">Month</th>
                <th className="p-4 border-b border-gray-300">Order Date</th>
                <th className="p-4 border-b border-gray-300">Price</th>
                <th className="p-4 border-b border-gray-300">Total Orders</th>
                <th className="p-4 border-b border-gray-300">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row) => (
                <React.Fragment key={row.month}>
                  {row.orders.map((order, index) => (
                    <tr key={`${row.month}-${index}`} className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-300">{index === 0 ? row.month : ''}</td>
                      <td className="p-4 border-b border-gray-300">{order.date}</td>
                      <td className="p-4 border-b border-gray-300 text-right">{order.price.toLocaleString()}</td>
                      {index === 0 && (
                        <>
                          <td className="p-4 border-b border-gray-300 text-right" rowSpan={row.orders.length}>
                            <strong>{row.totalOrders}</strong>
                          </td>
                          <td className="p-4 border-b border-gray-300 text-right" rowSpan={row.orders.length}>
                            <strong>{row.totalAmount.toLocaleString()}</strong>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              <tr className="bg-gray-100 font-semibold">
                <td className="p-4 border-t border-gray-300" colSpan={4}>Total Revenue</td>
                <td className="p-4 border-t border-gray-300 text-right">{totalRevenue.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
