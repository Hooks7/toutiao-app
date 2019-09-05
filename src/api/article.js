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
      channelId,
      timestamp,
      withTop
    }
  })
}
