import {io} from 'socket.io-client';

export const initSocket = async () =>{
    console.log("REACT_APP_BACKEND_URL =", process.env.REACT_APP_BACKEND_URL);

    const options = {
        path: "/socket.io",
        forceNew: true, 
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(process.env.REACT_APP_BACKEND_URL, options);
}