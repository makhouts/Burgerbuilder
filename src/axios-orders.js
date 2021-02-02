import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://myburgerbuilder-a7f8c.firebaseio.com/',

});