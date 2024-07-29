
import React from 'eact';
import NotificationProvider from './NotificationProvider';
import NotificationList from './NotificationList';

function App() {
  return (
    <NotificationProvider>
      <NotificationList />
    </NotificationProvider>
  );
}

export default App;