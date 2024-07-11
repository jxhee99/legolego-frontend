// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import apiClient from '../api/apiClient'; // apiClient import

// const websocketService = {
//     stompClient: null,
//     connected: false,
//     subscriptions: {},

//     async connect(userNum, onMessageReceived) {
//         if (this.connected) return;

//         console.log('Attempting to connect to WebSocket server at http://localhost:8080/ws');
        
//         // Fetch the access token using apiClient
//         try {
//             const response = await apiClient.get('/auth/token'); // Adjust the endpoint as necessary
//             const accessToken = response.data.accessToken;

//             const socket = new SockJS('http://localhost:8080/ws');
//             this.stompClient = Stomp.over(socket);

//             this.stompClient.connect(
//                 { Authorization: `Bearer ${accessToken}` }, // Use the access token in the headers
//                 (frame) => {
//                     console.log('Connected: ' + frame);
//                     this.connected = true;
//                     this.subscribe(`/topic/alarm/${userNum}`, onMessageReceived);
//                 },
//                 (error) => {
//                     console.error('WebSocket connection error:', error);
//                 }
//             );
//         } catch (error) {
//             console.error('Error fetching access token:', error);
//         }
//     },

//     subscribe(destination, callback) {
//         if (this.stompClient && this.connected) {
//             this.subscriptions[destination] = this.stompClient.subscribe(destination, (message) => {
//                 console.log('Message received: ', message.body);
//                 callback(JSON.parse(message.body));
//             });
//         }
//     },

//     unsubscribe(destination) {
//         if (this.subscriptions[destination]) {
//             this.subscriptions[destination].unsubscribe();
//             delete this.subscriptions[destination];
//         }
//     },

//     disconnect() {
//         if (this.stompClient && this.connected) {
//             Object.keys(this.subscriptions).forEach((destination) => {
//                 this.unsubscribe(destination);
//             });
//             this.stompClient.disconnect();
//             this.connected = false;
//             console.log('Disconnected');
//         }
//     }
// };

// export default websocketService;

// 수정 07/10

// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';


// const websocketService = {
//     stompClient: null,
//     connected: false,
//     subscriptions: {},

//     connect(userNum, token, onMessageReceived) {
//         if (this.connected) return;

//         console.log('Attempting to connect to WebSocket server at http://localhost:8080/ws');


//         if (!token) {
//             console.error('No token found');
//             return;
//         }
        
//         // Fetch the access token using apiClient
//         try {
//             // const response = await apiClient.get('/auth/token'); // Adjust the endpoint as necessary
//             // const accessToken = response.data.accessToken;

//             const socket = new SockJS('http://localhost:8080/ws');
//             this.stompClient = Stomp.over(socket);

//             this.stompClient.connect(
//                 { Authorization: `Bearer ${token}` }, // Use the access token in the headers
//                 (frame) => {
//                     console.log('Connected: ' + frame);
//                     this.connected = true;
//                     this.subscribe(`/topic/alarm/${userNum}`, onMessageReceived);
//                 },
//                 (error) => {
//                     console.error('WebSocket connection error:', error);
//                 }
//             );
//         } catch (error) {
//             console.error('Error fetching access token:', error);
//         }
//     },

//     subscribe(destination, callback) {
//         if (this.stompClient && this.connected) {
//             this.subscriptions[destination] = this.stompClient.subscribe(destination, (message) => {
//                 console.log('Message received: ', message.body);
//                 // callback(JSON.parse(message.body));
//                 // 메시지를 파싱하지 않고 그대로 콜백으로 전달
//                  callback(message.body);

//             });
//         }
//     },

//     unsubscribe(destination) {
//         if (this.subscriptions[destination]) {
//             this.subscriptions[destination].unsubscribe();
//             delete this.subscriptions[destination];
//         }
//     },

//     disconnect() {
//         if (this.stompClient && this.connected) {
//             Object.keys(this.subscriptions).forEach((destination) => {
//                 this.unsubscribe(destination);
//             });
//             this.stompClient.disconnect();
//             this.connected = false;
//             console.log('Disconnected');
//         }
//     }
// };

// export default websocketService;

// 수정 : 07/11
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const websocketService = {
    stompClient: null,
    connected: false,

    connect(userNum, accesstoken, onMessageReceived) {
        if (this.connected) return;

        console.log(`Attempting to connect to WebSocket server at http://localhost:8080/ws with token ${accesstoken}`);

        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect(
            { Authorization: `Bearer ${accesstoken}` },
            (frame) => {
                console.log('Connected: ' + frame);
                this.connected = true;
                this.stompClient.subscribe(`/topic/alarm/${userNum}`, (message) => {
                    console.log('Message received: ', message.body);
                    try {
                        const parsedMessage = JSON.parse(message.body);
                        onMessageReceived(parsedMessage);
                    } catch (e) {
                        console.error('Error parsing message:', e);
                        onMessageReceived({ message: message.body });
                    }
                });
            },
            (error) => {
                console.error('WebSocket connection error:', error);
                setTimeout(() => this.connect(userNum, accesstoken, onMessageReceived), 5000); // 5초 후에 재연결 시도
            }
        );
    },

    disconnect() {
        if (this.stompClient && this.connected) {
            this.stompClient.disconnect();
            this.connected = false;
            console.log('Disconnected');
        }
    }
};

export default websocketService;

