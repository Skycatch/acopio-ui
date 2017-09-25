import api from '../api'

const getProductosForAcopioIds = (acopioIds) => {
  const query = acopioIds.map(id => ({ acopioId: id }))
  const filter = { where: { or: query } }
  const filterString = JSON.stringify(filter)
  return api.getProductosWhere(filterString)
}

export default getProductosForAcopioIds
