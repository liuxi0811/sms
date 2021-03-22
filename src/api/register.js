import request from '@/utils/request'

export function register(username,password,nickname){
    return request({
        url:"/user/login",
        method:'post',
        data:{
            username,
            password,
            nickname
        }
    })  
}