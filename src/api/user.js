import request from '@/utils/request'

export const userRegisterRequest = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginRequest = ({ username, password }) =>
  request.post('/api/login', { username, password }) // 这里只有一个语句从而能够返回得到值

export const userInfoRequest = () => request.get('/my/userinfo')
