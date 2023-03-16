import request from '@/utils/request'
function getPrecinctList(data) {
  let url = '/community/precinct/queryPrecinctList?precinctId=' + data.precinctId
  if (data.precinctKind) url += '&precinctKind=' + data.precinctKind
  return request({
    url: url,
    method: 'get'
  })
}
function queryGridList(data) {
  let url = '/community/grid/queryGridList?streetId=' + data.precinctId
  return request({
    url: url,
    method: 'get'
  })
}
function getGridMapList() {
  return request({
    url: '/community/location/getGridStationDuplicateRemoval',
    method: 'get'
  })
}
export default { getPrecinctList, queryGridList, getGridMapList }
