import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        let token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
        let header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
        config.headers[header] = token;
        config.url = CONTEXTPATH+config.url;
        return config;
    }
);

export default axios;