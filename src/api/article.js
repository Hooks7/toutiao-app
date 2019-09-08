import request from '@/utils/request'

export const getArticles = ({
  // 频道id
  channelId,
  // 时间戳
  timestamp,
  // 是否包含置顶1，0不包含
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
  //  /app/v1_1/articles?channel_id=0&timestamp=1223232
}

// 不喜欢的文章
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    // 文章id
    target: id
  })
}

// 举报文章
export const reportArticle = ({ target, type }) => {
  return request.post('/app/v1_0/article/reports', {
    target,
    type
  })
}

// 获取文章详情,id文章的id
export const getArticle = (id) => {
  return request.get(`/app/v1_0/articles/${id}`)
}
