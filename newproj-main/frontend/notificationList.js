import React, { useContext } from 'eact';
import NotificationContext from './NotificationProvider';

const NotificationList = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;