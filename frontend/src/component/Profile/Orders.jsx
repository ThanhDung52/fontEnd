// import React, { useEffect, useState, useMemo } from "react";
// import { OrderCard } from "./OrderCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getUsersOrders } from "../State/Order/Action";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

// export const Orders = () => {
//   const { auth, order } = useSelector((store) => store);
//   const dispatch = useDispatch();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const jwt = localStorage.getItem("jwt");

//   // Nhóm đơn hàng theo paymentId
//   const groupedOrders = useMemo(() => {
//     if (!order.orders || order.orders.length === 0) return {};
//     const grouped = {};
//     order.orders.forEach((order) => {
//       const paymentId = order.paymentId || "Unknown";
//       if (!grouped[paymentId]) grouped[paymentId] = [];
//       grouped[paymentId].push(order);
//     });
//     return grouped;
//   }, [order.orders]);

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUsersOrders(jwt));
//     }
//   }, [jwt, dispatch]);

//   // Mở dialog
//   const handleOpenDialog = (groupId) => {
//     setSelectedGroup(groupId);
//     setOpenDialog(true);
//   };

//   // Đóng dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedGroup(null);
//   };

//   return (
//     <div className="flex items-center flex-col">
//       <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
//       <div className="space-y-5 w-full lg:w-1/2">
//         {Object.keys(groupedOrders).length > 0 ? (
//           Object.entries(groupedOrders)
//             .reverse()
//             .map(([groupId, orders]) => (
//               <div key={groupId} className="border p-4 rounded">
//                 <h2 className="text-lg font-semibold">Group ID: {groupId}</h2>
//                 <Button
//                   onClick={() => handleOpenDialog(groupId)}
//                   variant="outlined"
//                 >
//                   {selectedGroup === groupId ? "Ẩn chi tiết" : "Xem chi tiết"}
//                 </Button>
//               </div>
//             ))
//         ) : (
//           <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào.</p>
//         )}
//       </div>

//       {/* Dialog hiển thị chi tiết đơn hàng */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>Order Details</DialogTitle>
//         <DialogContent>
//           {selectedGroup && groupedOrders[selectedGroup] ? (
//             groupedOrders[selectedGroup].map((order) => (
//               <div key={order.id} className="border-t pt-4">
//                 <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
//                 <div className="space-y-2">
//                   {order.items.map((item) => (
//                     <OrderCard key={item.id} order={order} item={item} />
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">Không có dữ liệu để hiển thị.</p>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Đóng
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

import React, { useEffect, useState, useMemo } from "react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../State/Order/Action";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  Typography,
} from "@mui/material";
import Barcode from "react-barcode";

export const Orders = () => {
  const { auth, order } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const jwt = localStorage.getItem("jwt");

  // Nhóm đơn hàng theo paymentId
  const groupedOrders = useMemo(() => {
    if (!order.orders || order.orders.length === 0) return {};
    const grouped = {};
    order.orders.forEach((order) => {
      const paymentId = order.paymentId || "Unknown";
      if (!grouped[paymentId]) grouped[paymentId] = [];
      grouped[paymentId].push(order);
    });
    return grouped;
  }, [order.orders]);

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [jwt, dispatch]);

  // Mở dialog
  const handleOpenDialog = (groupId) => {
    setSelectedGroup(groupId);
    setOpenDialog(true);
  };

  // Đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGroup(null);
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">Đơn hàng của bạn</h1>

      <div className="space-y-5 w-full lg:w-1/2">
        {Object.keys(groupedOrders).length > 0 ? (
          Object.entries(groupedOrders)
            .reverse()
            .map(([groupId, orders]) => {
              if (!orders) return null;
              const totalItems = orders.reduce(
                (sum, order) => sum + (Array.isArray(order.items) ? order.items.length : 0),
                0
              );
              const totalAmount = orders.reduce(
                (sum, order) =>
                  sum +
                  (Array.isArray(order.items)
                    ? order.items.reduce((itemSum, item) => itemSum + item.totalPrice, 0)
                    : 0),
                0
              );
              const totalPaymentStatus = orders.reduce((accumulator, order) => {
                return accumulator + (order.paymentStatus || 0); // Thêm giá trị paymentStatus của mỗi order vào accumulator
              }, 0);
              return (
                <div key={groupId} className="border p-4 rounded-lg shadow-md">
                  {/* Thông tin tổng quan */}
                  <div className="flex justify-between items-center">
                    {/* <Typography variant="h6">Đơn hàng:
                      
                      <Barcode className="" value={groupId} /> 
                      
                      </Typography> */}

                    <div className="order-group">
                      <Typography variant="h6" className="order-title">
                        Đơn hàng:
                      </Typography>
                      <div className="barcode-container">
                        <Barcode
                          value={groupId}
                          width={1} // Điều chỉnh độ rộng của mã vạch
                          height={40} // Điều chỉnh chiều cao của mã vạch
                        />
                      </div>
                    </div>
                    <Typography variant="body2" className="text-gray-600">
                      Tổng số món: {totalItems} | Tổng giá trị:{" "}
                      {totalAmount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",} 
            )} 
                    </Typography>
                  </div>

                  {/* Nút mở/đóng chi tiết */}
                  <Button
                    onClick={() => handleOpenDialog(groupId)}
                    variant="outlined"
                    className="mt-3"
                  >
                    {selectedGroup === groupId ? "Ẩn chi tiết" : "Xem chi tiết"}
                  </Button>
                </div>
              );
            })
        ) : (
          <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào.</p>
        )}
      </div>

      {/* Dialog hiển thị chi tiết đơn hàng */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedGroup && groupedOrders[selectedGroup] ? (
            groupedOrders[selectedGroup].map((order) => (
              <div key={order.id} className="border-t pt-4">
                <Typography variant="body1">
                  Ngày đặt: {new Date(order.createdAt).toLocaleString()}
                </Typography>
                <div className="space-y-2 mt-3">
                  {order.items.map((item) => (
                    <OrderCard key={item.id} order={order} item={item} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có dữ liệu để hiển thị.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
