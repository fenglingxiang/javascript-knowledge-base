// 简易深拷贝
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  const cloneObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key])
    }
  }

  return cloneObj
}