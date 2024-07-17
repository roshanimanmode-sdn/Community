import React, { useEffect, useState } from 'react';
import { showNotification } from '../../Services/socketService';
import { SideBar } from '../SideBar/sideBar';

export function Notification() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const cleanup = showNotification(setNotification);
      
        return () => {
          cleanup();
        };
      }, []);

    return (
        <div className='notification-container mt-4'>
            <SideBar />
            <br />

            <div className="col-sm-9">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="well">
                            <p>Notifications</p>
                            {notification && (
                                <div>
                                    <p>Notification Sent to <b>{notification?.name}</b></p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
