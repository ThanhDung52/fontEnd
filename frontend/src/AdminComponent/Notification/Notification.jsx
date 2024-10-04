import React, { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import './Notification.css'; // Đảm bảo bạn tạo file CSS cho Notification
import { green } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { useSelector } from 'react-redux';

const Notification = ({ message, type, onClose }) => {
  const {error} = useSelector((store)=>store)
  if (!message) return null; // Không hiển thị nếu không có thông điệp



  return (
    <div className="notification-overlay">
      <div className={`notification ${type}`}>
      <IconButton
          size="small"
          className="close-button"
          onClick={onClose}
         sx={{
          color:"inherit"
         }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
        <div className="message-content mt-5">
          <span>{message}</span>
          {!error ?
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
          :
          <ReportGmailerrorredIcon sx={{ fontSize: "5rem", color: green[500] }} />  
        }
         
        </div>
      </div>
    </div>
  );
};

export default Notification;
