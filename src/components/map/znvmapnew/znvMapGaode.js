const AMap = window.AMap
let eventMap = {
  graphicsClick: null
}

class Map {
  constructor(mapId, opts) {
    opts = Object.assign(
      {
        zoom: 12,
        minZoom: 1,
        maxZoom: 17,
        center: [120.422167, 36.117018]
      },
      opts
    )
    // 创建地图
    let map = new AMap.Map(mapId, {
      zoom: opts.zoom, // 级别
      center: opts.center, // 中心点坐标
      viewMode: '2D', // 使用3D视图
      mapStyle: 'amap://styles/9b3f6102bf569578d433f2257514db9c'
    })
    this.map = map
    const promise = new Promise((resolve, reject) => {
      resolve(this)
    })
    return promise
  }
  _on(event, handler) {
  }
}

class Marker {
  constructor(map, opts) {
    // 创建一个 icon
    var icon = new AMap.Icon({
      size: new AMap.Size(opts.size.width, opts.size.height),
      image: opts.icon || 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
    })

    // 将 icon 传入 marker
    var Marker = new AMap.Marker({
      position: new AMap.LngLat(opts.position.lng, opts.position.lat),
      icon: icon,
      offset: new AMap.Pixel(opts.offset.x, opts.offset.y)
    })
    this.Marker = Marker
    this.opts = opts
    return this
  }

  _getPosition() {
    return [this.opts.position.lng, this.opts.position.lat]
  }

  _addToMap(map) {
    map.map.add(this.Marker)
  }

  _on(event, handler) {
    this.Marker.on(event, handler)
  }
}

class MarkerClusterer {
  constructor(map, markers, opts) {
    let points = markers.map(e => {
      return e.Marker
    })
    let cluster = new AMap.MarkerClusterer(map.map, points, {
      gridSize: opts.gridSize || 60
    })
    this.cluster = cluster
    return this
  }

  _addMarkers(markers) {
    let points = markers.map(e => {
      return e.Marker
    })
    this.cluster.addMarkers(points)
  }

  _removeMarkers(removeMarkers) {
    let points = removeMarkers.map(e => {
      return e.Marker
    })
    this.cluster.removeMarkers(points)
  }

  _clearMarkers() {
    this.cluster.clearMarkers()
  }
}

class Polygon {
  constructor(map, opt) {
    var defOpts = {
      path: [],
      strokeColor: '#0010ff', // 线颜色
      strokeOpacity: 0.75, // 线透明度
      strokeWeight: 1, // 线宽
      strokeStyle: 'solid', // 线样式
      fillColor: '#0010ff',
      fillOpacity: 0.3
    }
    if (opt) {
      defOpts = $.extend(defOpts, opt)
    }
    var polygon = new AMap.Polygon(defOpts)
    if (map) {
      map.map.add(polygon)
    }
    this.layer = polygon
    this.extData = defOpts.extData
    return this
  }

  _hide() {
    this.layer.hide()
  }

  _show() {
    this.layer.show()
  }

  _getExtData() {
    return this.extData
  }
}

export default { Map, Marker, MarkerClusterer, Polygon }
