import request from '@/utils/request'

/**
 * 获取频道列表
 * 1. 用户登录，获取登录用户保存的频道列表
 * 2. 用户没有登录，获取默认的频道列表
 */

export const getDefaultOrUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}

// 获取所有频道
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}

// 删除用户频道列表
export const delAllChannels = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}

// 添加用户频道
export const addChannel = ({
  id, // 当前频道id
  seq // 顺序序号
}) => {
  return request.put(`/app/v1_0/user/channels/${id}`, {
    seq
  })
}
