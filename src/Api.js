import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://openlibrary.org/',
    responseEncoding: 'utf8',
    responseType: 'json',
});

export default Api