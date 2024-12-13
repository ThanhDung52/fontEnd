import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";

export const RestaurantDashboard = () => {
  let barChart, pieChart, lineChart;
  const theme = useTheme(); // Lấy theme hiện tại
  const dispatch = useDispatch();
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [productStats, setProductStats] = useState([]);

  const updateData = () => {
    document.getElementById("updateTime").textContent =
      new Date().toLocaleString();
    // alert("Dữ liệu mới đã được tải!");
  };

  useEffect(() => {
    if (restaurant.userRestaurant && restaurant.userRestaurant.id) {
      dispatch(fetchRestaurantsOrder(restaurant.userRestaurant.id)); // Fetch các đơn hàng theo ID nhà hàng
    }
  }, [jwt, dispatch, restaurant.userRestaurant?.id]); // Cập nhật khi JWT hoặc ID nhà hàng thay đổi

  console.log("restaurant", restaurant);

  console.log("order restaurant ", restaurantOrder);

  // // Tính tổng doanh thu từ các đơn hàng
  const totalRevenue =
    restaurantOrder.orders?.reduce(
      (total, order) => total + order.totalPrice,
      0
    ) || 0;

  const totalOrder = restaurantOrder ? restaurantOrder.orders.length : 0;

  const exportReport = async () => {
    const doc = new jsPDF();
    doc.setFont("Times New Roman", "bold");
    doc.setFontSize(22);
    doc.text("Báo cáo thống kê bán hàng", 20, 20);
    doc.setFont("Times New Roman", "normal");
    doc.setFontSize(12);
    doc.text("Tổng Doanh Thu: ${totalRevenue}", 20, 40);
    doc.text("Số Đơn Hàng: 1,200", 20, 50);
    doc.text("Lợi Nhuận: $12,000", 20, 60);
    doc.text("Khách Hàng Truy Cập: 35,000", 20, 70);
    doc.text("Dữ liệu cập nhật vào: " + new Date().toLocaleString(), 20, 80);

    // Xuất biểu đồ doanh thu theo tháng
    doc.addPage();
    doc.text("Biểu đồ doanh thu theo tháng", 20, 20);
    const barCanvas = document.getElementById("barChart");
    if (barCanvas) {
      const barImageData = barCanvas.toDataURL("image/png");
      doc.addImage(barImageData, "PNG", 20, 30, 180, 90);
    } else {
      console.error("Canvas barChart không tìm thấy.");
    }

    // Xuất biểu đồ phương thức thanh toán
    doc.addPage();
    doc.text("Biểu đồ phương thức thanh toán", 20, 20);
    const pieCanvas = document.getElementById("pieChart");
    if (pieCanvas) {
      const pieImageData = pieCanvas.toDataURL("image/png");
      doc.addImage(pieImageData, "PNG", 20, 30, 180, 90);
    } else {
      console.error("Canvas pieChart không tìm thấy.");
    }

    // Xuất biểu đồ khách hàng theo tuần
    doc.addPage();
    doc.text("Biểu đồ khách hàng theo tuần", 20, 20);
    const lineCanvas = document.getElementById("lineChart");
    if (lineCanvas) {
      const lineImageData = lineCanvas.toDataURL("image/png");
      doc.addImage(lineImageData, "PNG", 20, 30, 180, 90);
    } else {
      console.error("Canvas lineChart không tìm thấy.");
    }

    // Xuất bảng sản phẩm bán chạy
    const columns = ["Tên Sản Phẩm", "Số Lượng Bán", "Giá", "Tổng Doanh Thu"];
    const rows = [
      ["Bánh Mì", "500", "$3.00", "$1,500"],
      ["Pizza", "300", "$10.00", "$3,000"],
      ["Salad", "200", "$5.00", "$1,000"],
    ];

    // Tính toán vị trí bắt đầu cho bảng
    const startY =
      doc.internal.getNumberOfPages() > 1
        ? doc.autoTable.previous.finalY + 10
        : 90; // Thay đổi theo yêu cầu của bạn

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: startY,
      theme: "grid",
      headStyles: { fillColor: [54, 162, 235] },
      styles: { cellPadding: 5 },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "center" },
        2: { halign: "right" },
        3: { halign: "right" },
      },
    });

    doc.save("baocao_thongke_banhang.pdf");
  };

  useEffect(() => {
    // Dữ liệu mặc định cho 12 tháng
    const defaultOrderData = [
      { month: "Tháng 1", totalPrice: 0 },
      { month: "Tháng 2", totalPrice: 0 },
      { month: "Tháng 3", totalPrice: 0 },
      { month: "Tháng 4", totalPrice: 0 },
      { month: "Tháng 5", totalPrice: 0 },
      { month: "Tháng 6", totalPrice: 0 },
      { month: "Tháng 7", totalPrice: 0 },
      { month: "Tháng 8", totalPrice: 0 },
      { month: "Tháng 9", totalPrice: 0 },
      { month: "Tháng 10", totalPrice: 0 },
      { month: "Tháng 11", totalPrice: 0 },
      { month: "Tháng 12", totalPrice: 0 },
    ];

    // Nếu có dữ liệu từ API, tính toán doanh thu theo tháng
    const orders = restaurantOrder.orders || []; // `restaurantOrder.orders` chứa danh sách đơn hàng

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const monthIndex = createdAt.getMonth(); // Lấy chỉ số tháng (0-11)
      const totalPrice = order.totalPrice || 0;

      // Cộng dồn doanh thu vào tháng tương ứng
      defaultOrderData[monthIndex].totalPrice += totalPrice;
    });

    // Chuẩn bị dữ liệu cho biểu đồ
    const months = defaultOrderData.map((order) => order.month);
    const monthlyRevenue = defaultOrderData.map((order) => order.totalPrice);

    const barCtx = document.getElementById("barChart").getContext("2d");
    barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: months, // Hiển thị 12 tháng
        datasets: [
          {
            label: "Doanh thu",
            data: monthlyRevenue, // Dữ liệu doanh thu
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const totalPaid = orders
      .filter((order) => order.paymentStatus === "PAID")
      .reduce((sum, order) => sum + (order.totalPrice || 0), 0); // Nếu `totalPrice` null thì mặc định là 0
    const totalUnpaid = orders
      .filter((order) => order.paymentStatus === "UNPAID")
      .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    // Cập nhật biểu đồ với tổng tiền
    // Kiểm tra xem có biểu đồ nào đã được tạo trên canvas không và hủy nếu có
const pieCtx = document.getElementById("pieChart").getContext("2d");
if (window.pieChartInstance) {
  window.pieChartInstance.destroy(); // Hủy biểu đồ cũ nếu có
}

// Tạo biểu đồ mới
window.pieChartInstance = new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: ["Tổng tiền đã thanh toán", "Tổng tiền chưa thanh toán"],
    datasets: [
      {
        data: [totalPaid, totalUnpaid],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Màu cho "Đã thanh toán"
          "rgba(255, 99, 132, 0.6)", // Màu cho "Chưa thanh toán"
        ],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${context.label}: ${value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}`;
          },
        },
      },
    },
  },
});


const customerTotals = {};

// Duyệt qua từng đơn hàng và tính tổng tiền của khách hàng
orders.forEach(order => {
  const customerId = order.customer.id;
  const customerFullname = order.customer.fullname;
  const totalAmount = order.totalPrice || 0;  // Sử dụng totalPrice nếu có, nếu không thì 0
  if (customerTotals[customerId]) {
    customerTotals[customerId] += totalAmount;
  } else {
    customerTotals[customerId] = totalAmount;
  }
});

// Chuyển đối tượng thành mảng để sắp xếp theo tổng tiền
const customerData = Object.keys(customerTotals).map(customerId => ({
  customerId,
  totalSpent: customerTotals[customerId],
  
}));

// Sắp xếp khách hàng theo tổng tiền mua từ cao đến thấp
customerData.sort((a, b) => b.totalSpent - a.totalSpent);

// Lấy top 5 khách hàng có tổng tiền mua nhiều nhất
const topCustomers = customerData.slice(0, 5);
const labels = topCustomers.map(customer => `Khách hàng ${customer.customerId}`);
const data = topCustomers.map(customer => customer.totalSpent);

// Kiểm tra và hủy biểu đồ cũ (nếu có)
const lineCtx = document.getElementById('lineChart').getContext('2d');
if (window.lineChartInstance) {
  window.lineChartInstance.destroy(); // Hủy biểu đồ cũ
}

// Tạo biểu đồ mới
window.lineChartInstance = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: labels,  // Hiển thị tên khách hàng
    datasets: [{
      label: 'Tổng tiền đã mua',
      data: data,  // Dữ liệu tổng tiền
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  }
});


    updateData();

    return () => {
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
      if (lineChart) lineChart.destroy();
    };
  }, []);


  useEffect(() => {
    const getData = async () => {
     
      // Tính toán số lượng bán và doanh thu cho từng sản phẩm
      const productTotals = {};
      const orders = restaurantOrder.orders || []; 

      orders.forEach(order => {
        order.items.forEach(item => {
          const productName = item.food?.name || ["Không tìm thấy sản phẩm"];
          const totalAmount = item.food?.price * item.quantity || [];

          if (productTotals[productName]) {
            productTotals[productName].quantity += item.quantity;
            productTotals[productName].totalAmount += totalAmount;
          } else {
            productTotals[productName] = {
              quantity: item.quantity,
              totalAmount,
            };
          }
        });
      });

      // Chuyển đối tượng thành mảng và sắp xếp
      const sortedProducts = Object.keys(productTotals).map(productName => ({
        name: productName,
        quantity: productTotals[productName].quantity,
        totalAmount: productTotals[productName].totalAmount,
      }));

      // Sắp xếp sản phẩm theo số lượng bán
      sortedProducts.sort((a, b) => b.quantity - a.quantity);
      setProductStats(sortedProducts);
    };

    getData();
  }, []);

  return (
    <div
      className="bg-gray-100 min-h-screen"
      style={{ color: theme.palette.text.secondary }}
    >
      <header className="flex justify-between items-center p-5 bg-gray-200 shadow-md">
        <h1 className="text-2xl text-gray-800">Thống kê bán hàng</h1>
        <p className="text-sm text-gray-600">
          Dữ liệu cập nhật vào: <span id="updateTime"></span>
        </p>
        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-80"
            onClick={updateData}
          >
            Tải dữ liệu mới
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80"
            onClick={exportReport}
          >
            Xuất báo cáo PDF
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="text-lg text-gray-800">Tổng Doanh Thu</h3>
          <span className="text-2xl font-bold text-gray-800">
            ${totalRevenue}
          </span>
          <p className="text-sm text-green-600">+10% so với tháng trước</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="text-lg text-gray-800">Số Đơn Hàng</h3>
          <span className="text-2xl font-bold text-gray-800">
            ${totalOrder}
          </span>
          <p className="text-sm text-green-600">+5% so với tháng trước</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="text-lg text-gray-800">Lợi Nhuận</h3>
          <span className="text-2xl font-bold text-gray-800">$12,000</span>
          <p className="text-sm text-green-600">+8% so với tháng trước</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="text-lg text-gray-800">Khách Hàng Truy Cập</h3>
          <span className="text-2xl font-bold text-gray-800">35,000</span>
          <p className="text-sm text-green-600">+15% so với tháng trước</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="mb-4 text-lg text-gray-800">Doanh thu theo tháng</h3>
          <canvas id="barChart" width="400" height="200"></canvas>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="mb-4 text-lg text-gray-800">Phương thức thanh toán</h3>
          <canvas id="pieChart" width="400" height="200"></canvas>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="mb-4 text-lg text-gray-800">Khách hàng theo tuần</h3>
          <canvas id="lineChart" width="400" height="200"></canvas>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-md">
      <h3 className="mb-4 text-lg text-gray-800">Sản phẩm bán chạy</h3>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Tên Sản Phẩm</th>
            <th className="px-4 py-2 text-left">Số Lượng Bán</th>
            <th className="px-4 py-2 text-left">Giá</th>
            <th className="px-4 py-2 text-left">Tổng Doanh Thu</th>
          </tr>
        </thead>
        <tbody>
          {productStats.map((product, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">
                {product.totalAmount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="border px-4 py-2">
                {product.totalAmount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
