import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import VueAxios from "vue-axios"
import nProgress from "nprogress";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

//初始化axios
axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 6 * 1000,
    withCredentials: true
})

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

//配置请求拦截器
axios.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        nProgress.start()
        return request;
    }, ((error: any) => {
        console.log(error);
        return Promise.reject(error);
    }))

//配置响应拦截器
axios.interceptors.response.use(
    (response: AxiosResponse) => {
        nProgress.done()
        switch (response.status as number) {
            case 401: {
                ElMessage.warning("请先登录")
                const router = useRouter()
                router.push('/login')
                break
            }
            case 403: {
                ElMessage.warning("拒绝访问")
                break
            }
        }
        return response
    }, ((error: any) => {
        console.log(error);
        return Promise.reject(error);
    }))

export {axios, VueAxios}

