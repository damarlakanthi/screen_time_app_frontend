import React, { useMemo, useContext } from 'react';
import DarkModeContext from "../context/DarkModeContext";


const CreateNotification = ({ item, onDelete }) => {

  return (
    <div style={styles.notification}>
      <span>{item.text}</span>
      <button onClick={() => onDelete(item.id)} style={styles.deleteButton}>X</button>
    </div>
  );
};

const styles = {
  notification: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: '5px 10px'
  }
};

export const Notifications = ({ notifications, setNotifications }) => {
  const { darkMode } = useContext(DarkModeContext);
  const memoizedNotifications = useMemo(() => notifications, [notifications]);

  const deleteNotification = id => {
    const updatedNotifications = memoizedNotifications.filter(noti => noti.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  return (
    <div style={{ height: '60vh', overflowY: 'scroll' }}>
      {memoizedNotifications.length ? (
        <div>
          {memoizedNotifications.map(noti => (
            <CreateNotification key={noti.id} item={noti} onDelete={deleteNotification} />
          ))}
        </div>
      ) : (
        <p className={`${darkMode ? "text-white" : "text-black"} ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border-neutral-200`}>Nothing here..</p>
      )}
    </div>
  );
};
