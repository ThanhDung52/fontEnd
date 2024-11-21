import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../State/Order/Action";

const Notification = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt)); // Lấy đơn hàng của người dùng khi JWT có sẵn
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (order && order.orders) {
      const newNotifications = order.orders.map((orderItem) => {
        const status = renderOrderStatus(orderItem.orderStatus);
        return {
          id: orderItem.id,
          orderStatus: orderItem.orderStatus,
          statusText: status.text,
          statusIcon: status.icon,
          statusColor: status.color,
          createdAt: new Date(orderItem.createdAt),
          updatedAt: new Date(orderItem.updatedAt || orderItem.createdAt),
        };
      });

      // Cập nhật danh sách thông báo mới, thay thế các thông báo cũ với thông báo mới
      setNotifications(newNotifications);
    }
  }, [order]); // Khi state 'order' thay đổi, thông báo sẽ được cập nhật

  // Render trạng thái cho mỗi đơn hàng
  const renderOrderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return { text: "Đơn hàng đang chờ xử lý", icon: "⏳", color: "#FFBC42" };
      case "COMPLETED":
        return { text: "Đơn hàng đã hoàn thành", icon: "✅", color: "#4CAF50" };
      case "OUT_FOR_DELIVERY":
        return { text: "Đơn hàng đang vận chuyển", icon: "🚚", color: "#2196F3" };
      case "DELIVERED":
        return { text: "Đơn hàng đã giao", icon: "✅", color: "#4CAF50" };
      case "CANCELLED":
        return { text: "Đơn hàng bị hủy", icon: "❌", color: "#F44336" };
      default:
        return { text: "Trạng thái không xác định", icon: "❓", color: "#9E9E9E" };
    }
  };

  // Sắp xếp các thông báo theo trạng thái và thời gian
  const sortedNotifications = notifications
    .sort((a, b) => {
      const statusA = a.orderStatus === "UPDATED" ? 1 : 0;
      const statusB = b.orderStatus === "UPDATED" ? 1 : 0;
      return statusB - statusA || b.updatedAt - a.updatedAt;
    })
    .slice(0, 5); // Chỉ hiển thị tối đa 5 thông báo

  // Xóa thông báo sau 5 phút
  useEffect(() => {
    const timers = notifications.map((notification) =>
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((item) => item.id !== notification.id)
        );
      }, 5 * 60 * 1000) // 5 phút
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications]);

  return (
    <div style={notificationContainerStyle}>
      <h2>Thông báo của bạn</h2>
      {sortedNotifications.length > 0 ? (
        sortedNotifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              ...notificationStyle,
              backgroundColor: notification.statusColor,
            }}
          >
            <div style={statusIconStyle}>{notification.statusIcon}</div>
            <div style={contentStyle}>
              <p>
                <strong>Đơn hàng #{notification.id}</strong>
              </p>
              <p>{notification.statusText}</p>
              <p
                style={{ fontSize: "12px", color: "#fff", fontStyle: "italic" }}
              >
                Ngày tạo: {notification.createdAt.toLocaleString()}
                {notification.updatedAt && (
                  <span>
                    {" "}
                    | Cập nhật: {notification.updatedAt.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
            <span role="img" aria-label="checkmark" style={{ fontSize: "20px" }}>
              ✅
            </span>
          </div>
        ))
      ) : (
        <p>Không có thông báo nào.</p>
      )}
    </div>
  );
};

const notificationContainerStyle = {
  marginLeft: "100px", // Để nội dung không bị chồng lên sidebar
  padding: "20px",
};

const notificationStyle = {
  color: "white",
  borderRadius: "8px",
  padding: "15px 20px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  width: "auto",
  minWidth: "200px",
  marginBottom: "15px",
  position: "relative",
  overflow: "hidden",
};

const statusIconStyle = {
  fontSize: "30px",
  marginRight: "10px",
};

const contentStyle = {
  flex: 1,
};

export default Notification;
