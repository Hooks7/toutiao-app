// 存储
export const setItem = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item))
}
// 读取
export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
// 删除
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
