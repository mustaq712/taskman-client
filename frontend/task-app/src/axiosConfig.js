import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URI
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
export default axios;