import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const RestaurantDashboard = () => {
  let barChart, pieChart, lineChart;

  const updateData = () => {
    document.getElementById('updateTime').textContent = new Date().toLocaleString();
    // alert("Dữ liệu mới đã được tải!");
  };

  const exportReport = async () => {
    const doc = new jsPDF();
    doc.setFont("TimesNewRoman", "bold");
    doc.setFontSize(22);
    doc.text("Báo cáo thống kê bán hàng", 20, 20);
    doc.setFont("TimesNewRoman", "normal");
    doc.setFontSize(12);
    doc.text("Tổng Doanh Thu: $50,000", 20, 40);
    doc.text("Số Đơn Hàng: 1,200", 20, 50);
    doc.text("Lợi Nhuận: $12,000", 20, 60);
    doc.text("Khách Hàng Truy Cập: 35,000", 20, 70);
    doc.text("Dữ liệu cập nhật vào: " + new Date().toLocaleString(), 20, 80);

    const columns = ["Tên Sản Phẩm", "Số Lượng Bán", "Giá", "Tổng Doanh Thu"];
    const rows = [
      ["Bánh Mì", "500", "$3.00", "$1,500"],
      ["Pizza", "300", "$10.00", "$3,000"],
      ["Salad", "200", "$5.00", "$1,000"],
    ];

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 100,
      theme: 'grid',
      headStyles: { fillColor: [54, 162, 235] },
      styles: { cellPadding: 5 },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      },
    });

    doc.save("baocao_thongke_banhang.pdf");
  };

  useEffect(() => {
    // Create bar chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [{
          label: 'Doanh thu',
          data: [5000, 7000, 8000, 6000, 9000],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
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

    // Create pie chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Thẻ tín dụng', 'Tiền mặt', 'Chuyển khoản'],
        datasets: [{
          data: [40, 30, 30],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Create line chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        datasets: [{
          label: 'Khách hàng',
          data: [1000, 1500, 2000, 2500],
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

    // Update data display time
    updateData();

    return () => {
      // Destroy charts on cleanup to avoid reuse error
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
      if (lineChart) lineChart.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-100">
      <header className="flex justify-between items-center p-5 bg-gray-200 shadow-md">
        <h1 className="text-2xl text-gray-800">Thống kê bán hàng</h1>
        <p className="text-sm text-gray-600">Dữ liệu cập nhật vào: <span id="updateTime"></span></p>
        <div>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-80" onClick={updateData}>Tải dữ liệu mới</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80" onClick={exportReport}>Xuất báo cáo PDF</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-5 grid grid-cols-1 gap-4">
        {/* Info Cards */}
        <div className="bg-white rounded-lg p-5 shadow-md"> {/* Similar for each info card */} </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="mb-4 text-lg text-gray-800">Doanh thu theo tháng</h3>
          <canvas id="barChart"></canvas>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h3 className="mb-4 text-lg text-gray-800">Phương thức thanh toán</h3>
          <canvas id="pieChart"></canvas>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-lg p-5 shadow-md col-span-2">
          <h3 className="mb-4 text-lg text-gray-800">Khách hàng truy cập</h3>
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </div>
  );
};
