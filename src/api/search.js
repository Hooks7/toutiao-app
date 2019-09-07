import request from '@/utils/request'

// 获取搜索建议
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

// 获取搜索历史记录
export const searchSuggestion = () => {
  return request.get('/app/v1_0/search/histories')
}

// 获取搜索结果
/**
 * @param {*
 * page  // 页数，不传默认为1
 * per_page // 每页数量，不传每页数量由后端决定
 * q   // 搜索关键词
 * }
 */
export const searchResult = ({
  page,
  perPage,
  q
}) => {
  return request.get('/app/v1_0/search', {
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
