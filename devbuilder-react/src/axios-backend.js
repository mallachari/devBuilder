import axios from 'axios';

//Config for dev and prod is stored in json file in config directory. 
//It was added to webpack config in externals object
import config from 'config';

const instance = axios.create({
    baseURL: config.serverUrl
});

export default instance;