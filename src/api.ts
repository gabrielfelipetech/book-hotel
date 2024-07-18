import axios from 'axios';

const baseURL = 'http://localhost:3001'; // import.meta.env.VITE_MY_ENV_VARIABLE;
const timeout = 1000 * 30;
const api = axios.create({ baseURL, timeout });
export default api;
