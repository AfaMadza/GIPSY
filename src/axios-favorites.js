import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://giphsearchy.firebaseio.com/'
});

export default instance;

