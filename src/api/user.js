import request from '@/utils/request'

/**
 *  登录方法
 * @param {*} 登录提交服务器的数据mobile,code
 */
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

// 拉黑作者
export const blacklists = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}

// 关注用户
export const focusUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    target: id // 关注用户id
  })
}

// 取消关注用户
export const unFollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}

// 点赞
export const ThumbUpArticles = (id) => {
  return request.post('/app/v1_0/article/likings', {
    target: id
  })
}

// 取消点赞
export const CancelThumbUp = (id) => {
  return request.delete(`/app/v1_0/article/likings/${id}`)
}

// 取消不喜欢

export const dislikeArticles = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
