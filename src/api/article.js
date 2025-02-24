import request from '@/utils/request'
// 文章分类： 列表 添加 编辑 删除
export const artChannelsService = () => request.get('/my/cate/list')

export const artAddChannelService = (data) => request.post('/my/cate/add', data)

export const artEditChannelService = (data) => request.put('/my/cate/info', data)

export const artDeleteChannelService = (id) => request.delete('/my/cate/del', { params: { id } })

// 文章管理： 列表
export const artGetManageService = (params) => request.get('/my/article/list', { params })

export const artAddArticleService = (data) => request.post('/my/article/add', data)

export const artEditArticleService = (data) => request.put('/my/article/info', data)

export const artGetArticleInfoService = (id) => request.get('/my/article/info', { params: { id } })

export const artDeleteArticleService = (id) =>
  request.delete('/my/article/info', { params: { id } })
