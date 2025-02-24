import request from '@/utils/request'

export const userRegisterRequest = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginRequest = ({ username, password }) =>
  request.post('/api/login', { username, password }) // 这里只有一个语句从而能够返回得到值

export const userInfoRequest = () => request.get('/my/userinfo')

export const userInfoUpdateService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

// 更新用户头像
export const userAvatarUpdateService = (avatar) => request.patch('/my/update/avatar', { avatar })

// 更新用户密码
export const userPasswordUpdateService = (data) => request.patch('/my/updatepwd', data)
