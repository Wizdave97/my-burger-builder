import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-96754.firebaseio.com/'
});

export default instance;