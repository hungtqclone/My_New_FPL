import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://103.57.129.166:3000/'
        // baseURL: 'http://103.57.129.166:65115/'

        // baseURL: 'http://10.0.2.2:3000/'
        // baseURL: 'http://192.168.0.101:3000/'
    });
    axiosInstance.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem('token');
            config.headers = {
                'Authorizaztion': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    ); // callback
    return axiosInstance;
}

export default AxiosInstance;