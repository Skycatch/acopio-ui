const normalize = (arr, key = 'id') => arr.reduce((ret, item) => {
  return {
    ...ret,
    [item[key]]: item,
  }
}, {})

export default normalize
