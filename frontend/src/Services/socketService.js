import io from 'socket.io-client';

const socket = io('http://localhost:8989');

export const joinRoom = async (data) => {
  try {
    if (socket.connected) {
      socket.emit('join', data);
    } else {
      console.error('Socket not connected');
    }
  } catch (e) {
    console.error('Error in joinRoom:', e);
    throw e; 
  }
};

export const requestUser = async (receiveRequest, sendRequest) => {
  try {
    if (socket.connected) {
      socket.emit('request_user', receiveRequest, sendRequest);
      
    } else {
      console.error('Socket not connected');
    }
  } catch (e) {
    console.error('Error in requestUser:', e);
    throw e; 
  }
};

export const showNotification = (setNotification) => {
  const notificationHandler = (data) => {
    console.log('Received show_notification service:', data);
    setNotification(data);
  };

  if (socket.connected) {
    socket.on('show_notification', notificationHandler);

    return () => {
      socket.off('show_notification', notificationHandler);
    };
  } else {
    console.error('Socket not connected');
    return () => {}; // Return an empty function for cleanup if socket is not connected
  }
};

