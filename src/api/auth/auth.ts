import {axios} from "../../utils/axios"
import {loginVo} from "./types"

/**
 * 获取验证码
 */
export const getVerify = () => {
    return axios({
        url: '/api/getVerify',
        method: 'GET'
    })
}

/**
 * 校验验证码
 * @param code
 */
export const checkVerify = (code: string) => {
    return axios({
        url: `/api/checkVerify/${code}`,
        method: 'GET'
    })
}

/**
 * 登陆处理
 * @param data
 */
export const login = (data: loginVo) => {
    return axios({
        url: '/api/login',
        method: 'POST',
        data: JSON.stringify(data)
    })
}