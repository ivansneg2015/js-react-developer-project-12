import { io } from 'socket.io-client';

// Check if process.env.NODE_ENV exists to avoid errors
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// Create socket connection with computed URL
const socket = io(URL); // "undefined" means the URL will be computed from the `window.location` object

export default socket;
