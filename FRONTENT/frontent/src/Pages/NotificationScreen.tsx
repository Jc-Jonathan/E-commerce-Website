import  { useContext } from "react";
import {ShopContext} from '../Context/ShopContext'
import "../../src/Components/PagesStyles/Notification.css";

const NotificationScreen = () => {
  const notificationCtx = useContext(ShopContext);

  if (!notificationCtx) return <p>Loading...</p>;

  const { notifications } = notificationCtx;

  return (
    <div className="notification-screen">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p className="empty-text">No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li key={n.id} className="notification-card">
              <h3>{n.title}</h3>
              <p>{n.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationScreen;
