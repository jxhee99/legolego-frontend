// import React, { useState, useEffect, useRef } from 'react';
// import apiClient from '../../../api/apiClient';
// import websocketService from '../../WebSocketService'; // WebSocket 서비스 import
// import styles from './Notification.module.css'; // 스타일 파일을 추가합니다.

// const Notification = ({ role, userNum }) => {
//     const [notifications, setNotifications] = useState([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [hasNewNotification, setHasNewNotification] = useState(false); // 새로운 알림이 있는지 확인하는 상태
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         if (userNum) {
//             console.log(`Connecting to WebSocket for user ${userNum}`);
//             websocketService.connect(userNum, (message) => {
//                 console.log('New message: ', message);
//                 setNotifications((prevNotifications) => [...prevNotifications, message]);
//                 setHasNewNotification(true); // 새로운 알림이 도착하면 상태를 업데이트
//                 console.log('setHasNewNotification', true);
//             });

//             return () => {
//                 websocketService.disconnect();
//             };
//         } else {
//             console.log('userNum is not available');
//         }
//     }, [userNum]);

//     useEffect(() => {
//         if (userNum) {
//             fetchNotifications();
//         }
//     }, [userNum, role]);

//     const fetchNotifications = async () => {
//         let url;
//         switch(role) {
//             case 'USER':
//                 url = '/user/alarms';
//                 break;
//             case 'PARTNER':
//                 url = '/partner/alarms';
//                 break;
//             case 'ADMIN':
//                 url = '/admin/alarms';
//                 break;
//             default:
//                 return;
//         }

//         try {
//             const response = await apiClient.get(url);
//             setNotifications(response.data);
//         } catch (error) {
//             console.error('Failed to fetch notifications:', error);
//         }
//     };

//     const checkNotification = async (alarmNum) => {
//         try {
//             await apiClient.put(`/alarms/${alarmNum}/check`);
//             setNotifications((prevNotifications) =>
//                 prevNotifications.filter((notification) => notification.alarmNum !== alarmNum)
//             );
//             if (notifications.length === 1) {
//                 setHasNewNotification(false); // 알림이 하나만 남아있을 경우, 알림 확인 시 빨간 점 제거
//                 console.log('No remaining notifications, setting hasNewNotification to false'); // 상태 업데이트 확인용 콘솔 로그
//             }
//         } catch (error) {
//             console.error('Failed to check notification:', error);
//         }
//     };

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//         setHasNewNotification(false); // 알림 목록을 열 때 빨간 점 제거
//         console.log('setHasNewNotification:', false); // 상태 업데이트 확인용 콘솔 로그
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setShowNotifications(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [dropdownRef]);

//     useEffect(() => {
//         const dropdown = dropdownRef.current;
//         if (dropdown) {
//             const handleWheel = (e) => {
//                 if (e.deltaY > 0) {
//                     dropdown.scrollTop += 30; // 스크롤 속도 조정
//                 } else {
//                     dropdown.scrollTop -= 30; // 스크롤 속도 조정
//                 }
//                 e.preventDefault();
//             };

//             dropdown.addEventListener('wheel', handleWheel);
//             return () => dropdown.removeEventListener('wheel', handleWheel);
//         }
//     }, [showNotifications]);

//     return (
//         <div className={styles.notificationContainer}>
//             <button className={styles.notificationButton} onClick={toggleNotifications}>
//                 알림
//                 {hasNewNotification && <span className={styles.newNotificationDot}></span>} {/* 새로운 알림이 있을 때 빨간 점 표시 */}
//             </button>
//             {showNotifications && (
//                 <div className={styles.notificationDropdown} ref={dropdownRef}>
//                     {notifications.length === 0 ? (
//                         <p className={styles.noNotifications}>새로운 알림이 없습니다.</p>
//                     ) : (
//                         notifications.map((notification) => (
//                             <div key={notification.alarmNum} className={styles.notificationItem}>
//                                 <p>{notification.message}</p>
//                                 <button onClick={() => checkNotification(notification.alarmNum)} className={styles.checkbox}>확인</button>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Notification;

// 수정 07/10

import React, { useState, useEffect, useRef, useContext } from 'react';
import apiClient from '../../../api/apiClient';
import websocketService from '../../WebSocketService'; // WebSocket 서비스 import
import styles from './Notification.module.css'; // 스타일 파일을 추가합니다.
import { AuthContext } from '../../../contexts/AuthContext';

const Notification = ({ role }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false); // 새로운 알림이 있는지 확인하는 상태
  const dropdownRef = useRef(null);

  const { userNum, accesstoken } = useContext(AuthContext);

  useEffect(() => {
    console.log('AuthContext values:', { userNum, accesstoken }); // AuthContext 값 로그 출력
    if (userNum && accesstoken) {
      // token 조건 추가
      console.log(`Connecting to WebSocket for user ${userNum}`);
      websocketService.connect(userNum, accesstoken, (message) => {
        // token 추가
        console.log('New message: ', message);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          message,
        ]);
        setHasNewNotification(true); // 새로운 알림이 도착하면 상태를 업데이트
        console.log('setHasNewNotification', true);
      });

      return () => {
        websocketService.disconnect();
      };
    } else {
      console.log('userNum or token is not available'); // token 관련 메시지 추가
    }
  }, [userNum, accesstoken]);

  useEffect(() => {
    if (userNum && accesstoken) {
      fetchNotifications();
    }
  }, [userNum, role, accesstoken]);

  const fetchNotifications = async () => {
    let url;
    switch (role) {
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
      const response = await apiClient.get(url, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      setNotifications(response.data);
      // 새로운 알림이 존재하는지 확인
      const hasNew = response.data.some(
        (notification) => !notification.isChecked
      );
      setHasNewNotification(hasNew); // 새로운 알림이 있는지 확인 후 상태 업데이트
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const checkNotification = async (alarmNum) => {
    try {
      await apiClient.put(`/alarms/${alarmNum}/check`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.alarmNum !== alarmNum
        )
      );
      if (notifications.length === 1) {
        setHasNewNotification(false); // 알림이 하나만 남아있을 경우, 알림 확인 시 빨간 점 제거
        console.log(
          'No remaining notifications, setting hasNewNotification to false'
        ); // 상태 업데이트 확인용 콘솔 로그
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      const handleWheel = (e) => {
        if (e.deltaY > 0) {
          dropdown.scrollTop += 30; // 스크롤 속도 조정
        } else {
          dropdown.scrollTop -= 30; // 스크롤 속도 조정
        }
        e.preventDefault();
      };

      dropdown.addEventListener('wheel', handleWheel);
      return () => dropdown.removeEventListener('wheel', handleWheel);
    }
  }, [showNotifications]);

  return (
    <div className={styles.notificationContainer}>
      <button
        className={styles.notificationButton}
        onClick={toggleNotifications}
      >
        알림
        {hasNewNotification && (
          <span className={styles.newNotificationDot}>❣️</span>
        )}{' '}
        {/* 새로운 알림이 있을 때 빨간 점 표시 */}
      </button>
      {showNotifications && (
        <div className={styles.notificationDropdown} ref={dropdownRef}>
          {notifications.length === 0 ? (
            <p className={styles.noNotifications}>새로운 알림이 없습니다.</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.alarmNum}
                className={styles.notificationItem}
              >
                <p>{notification.message}</p>
                <button
                  onClick={() => checkNotification(notification.alarmNum)}
                  className={styles.checkbox}
                >
                  확인
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
