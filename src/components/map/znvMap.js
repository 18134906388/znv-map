import coordtransform from './coordtransform'
import ZMap from './znvmapnew/znvMapArcgis'
// import store from '../../store'

let ZnvMap = {}
let map // 地图对象
let markerClusterLayer

let layerMarks = {}
let polygonMap = {}

ZnvMap.start = function (mapId, opts) {
  layerMarks = {}
  return new ZMap.Map(mapId, opts).then(res => {
    map = res
    markerClusterLayer = new ZMap.MarkerClusterer(map, [], { minClusterSize: 8 })
  })
}

// 加载点位
ZnvMap.loadPointLayer = function (points, opts) {
  let defParams = {
    isHidden: false
  }
  defParams = Object.assign({}, defParams, opts)
  let markers = []
  points.forEach((e) => {
    if (!(e.position.lng && e.position.lat)) {
      // 坐标有问题定位到青岛市中心
      e.position.lng = 120.422167
      e.position.lat = 36.117018
      // console.log('坐标有误', e)
      // return
    }
    let lnglat = ZnvMap.zbTransform(e.position)
    e.position.lng = lnglat[0]
    e.position.lat = lnglat[1]
    let marker = new ZMap.Marker(map, e)
    layerMarks[e.id] = marker
    if (!defParams.isHidden) {
      markers.push(marker)
    }
  })
  ZnvMap.showMarkers(markers)
}

ZnvMap.showMarkers = function (markers) {
  markerClusterLayer._addMarkers(markers)
}

ZnvMap.hideMarkers = function (markers) {
  markerClusterLayer._removeMarkers(markers)
}

ZnvMap.hideAllMarkers = function (markers) {
  markerClusterLayer._clearMarkers()
}

ZnvMap.showMarkersByType = function (type) {
  let markers = []
  for (let key in layerMarks) {
    if (layerMarks[key].opts.extData.type === type) {
      markers.push(layerMarks[key])
    }
  }
  ZnvMap.showMarkers(markers)
}

ZnvMap.hideMarkersByType = function (type) {
  let markers = []
  for (let key in layerMarks) {
    if (layerMarks[key].opts.extData.type === type) {
      markers.push(layerMarks[key])
    }
  }
  ZnvMap.hideMarkers(markers)
}

// 刻画区域轮廓
ZnvMap.loadPolygonLayer = function (id, pathStr, opts) {
  let path = pathStr.split(';')
  let lnglatArr = []

  for (let i = 0; i < path.length; i++) {
    let item = path[i]
    let lnglat = item.split(',')
    // if (lnglat.length !== 2) {
    //   continue
    // }
    let lnglan = ZnvMap.zbTransform({
      lng: lnglat[0],
      lat: lnglat[1]
    })
    lnglatArr.push(lnglan)
  }

  opts.path = lnglatArr
  opts.isShowLabel = true
  opts.label = opts.extData.gridName
  opts.id = id
  let polygon = new ZMap.Polygon(map, opts)
  polygonMap[id] = polygon
  return polygon
}

ZnvMap.zbTransform = function (param, csysType = 1) {
  // 坐标转换
  let point
  param.lng = param.gpsX || param.gpsx || param.lng
  param.lat = param.gpsY || param.gpsy || param.lat
  if (csysType === 1) {
    point = [parseFloat(param.lng), parseFloat(param.lat)]
  } else if (csysType === 4) {
    point = coordtransform.wgs84togcj02(parseFloat(param.lng), parseFloat(param.lat))
  } else if (csysType === 3) {
    point = coordtransform.gcj02towgs84(parseFloat(param.lng), parseFloat(param.lat))
  }
  return point
}

export default ZnvMap
