"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AnimalContext, AnimalContextType, NotificationContext } from "./customerResourcesContext";

interface Notification {
  animal_number: string;
  body: string;
  timestamp: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Base API URL
const DEFAULT_HOURS = 24; // Default hours for notifications

const Notifications: React.FC = () => {
  const { animalData,userData } = useContext<AnimalContextType>(AnimalContext);
  const { showNotification } = useContext(NotificationContext);
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const access_token = userData.access_token;
  const customer_id = userData.customer_id;

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!customer_id || !access_token) {
      console.error("Missing customer_id or access_token.");
      showNotification("Authentication error: Missing credentials.", "error");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/for_customer/${customer_id}`,
        {
          headers: {
            token : userData.access_token,
            customer_id : userData.customer_id,
            hours: DEFAULT_HOURS,
          },
        }
      );
      console.log(response.data)
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      showNotification("Error fetching notifications.", "error");
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container overflow-scroll">
      <h3>GPS Monitoring Alerts</h3>
      <p>Displaying recent alerts about animals leaving their designated geofence.</p>

      {notifications.length > 0 ? (
        <div className="notifications-list ">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-card  ">
              <h4>🚨 Animal Alert: {notification.animal_number}</h4>
              <p className="alert-body">{notification.body}</p>
              <p className="timestamp">
                <strong>Time:</strong> {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recent notifications.</p>
      )}

      <style jsx>{`
        .container {
          max-width: 1000px;
          height: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        h3 {
          text-align: center;
          color: #333;
        }
        .notifications-list {
          margin-top: 20px;
        }
        .notification-card {
          background: #fff;
          padding: 15px;
          margin: 10px 0;
          border-left: 6px solid #ff4d4d;
          border-radius: 5px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .alert-body {
          font-size: 14px;
          color: #333;
          margin: 5px 0;
        }
        .timestamp {
          font-size: 12px;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default Notifications;
