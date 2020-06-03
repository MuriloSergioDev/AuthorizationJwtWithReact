import axios from 'axios';

const api = axios.create({
    baseURL:'https://identitytoolkit.googleapis.com/v1',
})



export default api;