import { io } from 'socket.io-client';

const URL = import.meta.env.NODE_ENV === 'production' ? undefined : `http://localhost:`+2024;
console.log(URL);

export const socketInit = io(URL);