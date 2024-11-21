import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import './Notification.css'; // Đảm bảo file CSS được liên kết
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null; // Không hiển thị nếu không có thông điệp

  return (
    <div className="notification-overlay">
      <div className={`notification ${type}`}>
        <IconButton
          size="small"
          className="close-button"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <div className="message-content">
          <span>{message}</span>
          {type === 'success' ? (
            <div className="checkmark">
              <TaskAltIcon />
            </div>
          ) : (
            <div className="checkmark" style={{ backgroundColor: '#f44336' }}>
              <ReportGmailerrorredIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
