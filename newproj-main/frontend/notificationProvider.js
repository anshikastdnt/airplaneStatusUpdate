
import React, { createContext, useEffect, useState } from 'eact';
import io from 'ocket.io-client';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('newNotification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;