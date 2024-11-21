import { Button, Card } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";

export const OrderCard = ({ item, order }) => {
  // Lấy thông tin địa chỉ từ order.deliveryAddress
  const { wardName, streetAddress, districtName, provinceName} = order.deliveryAddress;

  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img className="h-16 w-16" src={item.food.images[0]} alt="" />
        <div>
          <p>{item.food.name}</p>
          <p>{item.totalPrice}</p>
        </div>
      </div>
 {/* Hiển thị địa chỉ dưới card */}
 <div className="mt-4 p-4 rounded-b-lg">
        <p className="text-sm">{streetAddress}, {wardName}, {districtName}, {provinceName}</p>
      </div>
      <div className="flex items-end">
        <Button className="cursor-not-allowed">{order.paymentStatus}</Button>
      </div>
      <div className="flex items-end">
        <Button className="cursor-not-allowed">{order.orderStatus}</Button>
      </div>

     
    </Card>
  );
};
