import React, { useState } from 'react';
import Notification from './Notification/Notification';

const App = () => {
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setMessage('Đây là một thông báo!');
    setShowNotification(true);

    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleShowNotification}>Hiển thị thông báo</button>
      {showNotification && (
        <Notification
          message={message}
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default App;
