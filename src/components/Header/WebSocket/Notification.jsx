import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient';
import websocketService from '../../WebSocketService'; // WebSocket 서비스 import
import styles from './Notification.module.css'; // 스타일 파일을 추가합니다.

const Notification = ({ role, userNum }) => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasNewNotification, setHasNewNotification] = useState(false); // 새로운 알림이 있는지 확인하는 상태

    useEffect(() => {
        if (userNum) {
            console.log(`Connecting to WebSocket for user ${userNum}`);
            websocketService.connect(userNum, (message) => {
                console.log('New message: ', message);
                setNotifications((prevNotifications) => [...prevNotifications, message]);
                setHasNewNotification(true); // 새로운 알림이 도착하면 상태를 업데이트
                console.log('setHasNewNotification', true);
                
            });

            return () => {
                websocketService.disconnect();
            };
        } else {
            console.log('userNum is not available');
        }
    }, [userNum]);

    useEffect(() => {
        if (userNum) {
            fetchNotifications();
        }
    }, [userNum, role]);

    const fetchNotifications = async () => {
        let url;
        switch(role) {
            case 'USER':
                url = '/user/alarms';
                break;
            case 'PARTNER':
                url = '/partner/alarms';
                break;
            case 'ADMIN':
                url = '/admin/alarms';
                break;
            default:
                return;
        }

        try {
            const response = await apiClient.get(url);
            setNotifications(response.data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const checkNotification = async (alarmNum) => {
        try {
            await apiClient.put(`/alarms/${alarmNum}/check`);
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.alarmNum !== alarmNum)
            ); if (notifications.length === 1) {
              setHasNewNotification(false); // 알림이 하나만 남아있을 경우, 알림 확인 시 빨간 점 제거
              console.log('No remaining notifications, setting hasNewNotification to false'); // 상태 업데이트 확인용 콘솔 로그
          }
        } catch (error) {
            console.error('Failed to check notification:', error);
        }
    };

    const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
      setHasNewNotification(false); // 알림 목록을 열 때 빨간 점 제거
      console.log('setHasNewNotification:', false); // 상태 업데이트 확인용 콘솔 로그
  };

  return (
    <div className={styles.notificationContainer}>
        <button className={styles.notificationButton} onClick={toggleNotifications}>
            알림
            {hasNewNotification && <span className={styles.newNotificationDot}></span>} {/* 새로운 알림이 있을 때 빨간 점 표시 */}
        </button>
        {showNotifications && (
            <div className={styles.notificationDropdown}>
                {notifications.length === 0 ? (
                    <p className={styles.noNotifications}>새로운 알림이 없습니다.</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification.alarmNum} className={styles.notificationItem}>
                            <p>{notification.message}</p>
                            <button onClick={() => checkNotification(notification.alarmNum)}>확인</button>
                        </div>
                    ))
                )}
            </div>
        )}
    </div>
);
};

export default Notification;