const minemap = window.minemap
const turf = window.turf
// 全局参数设置

minemap.domainUrl = '//2.22.131.158:21009'
minemap.dataDomainUrl = '//2.22.131.158:21009'
minemap.serverDomainUrl = '//2.22.131.158:21009'
minemap.spriteUrl = '//2.22.131.158:21009/minemapapi/v2.1.0/sprite/sprite'
minemap.serviceUrl = '//2.22.131.158:21009/service/'

// key、solution设置

minemap.key = 'cc6114fa3a7c48c3b97a3ac16741152d'
minemap.solution = 222530

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
    let map = new minemap.Map({
      container: mapId,
      style: '//2.22.131.158:21009/service/solu/style/id/222530', // 底图样式
      center: opts.center, // 地图中心点
      zoom: opts.zoom, // 地图默认缩放等级
      pitch: 0, // 地图俯仰角度
      maxZoom: opts.maxZoom, // 地图最大缩放等级
      minZoom: opts.minZoom, // 地图最小缩放等级
      projection: 'MERCATOR'
    })
    this.map = map
    const promise = new Promise((resolve, reject) => {
      resolve(this)
    })
    return promise
  }
  _on(event, handler) {}

  _addEditControl() {
    this._delEditControl()
    if (this.map) {
      this.edit = new minemap.edit.init(this.map, {
        boxSelect: true /* 是否支持拉框选择 */,
        touchEnabled: true /* 是否支持手指触屏 */,
        displayControlsDefault: true /* 是否启用编辑控件 */,
        showButtons: false /* 是否启用默认控件按钮 */
      })
    }
  }

  _delEditControl() {
    if (this.map && this.edit) {
      this.edit.dispose()
      this.edit = null
    }
  }
}

class Marker {
  constructor(map, opts) {
    var el = document.createElement('div')
    el.id = 'marker'
    el.style['background-image'] = `url(${opts.icon || 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'})`
    el.style['background-size'] = 'cover'
    el.style.width = opts.size.width + 'px'
    el.style.height = opts.size.height + 'px'

    // Marker构造函数接收两个参数，一个为自定义的DOM元素，一个是Object参数，其中包括偏移量等
    // offset参数为标注点相对于其左上角偏移像素大小
    // 调用setLngLat方法指定Marker的坐标位置
    var Marker = new minemap.Marker(el, { offset: [opts.offset.x, opts.offset.y] })
      .setLngLat([opts.position.lng, opts.position.lat])
      .addTo(map)
    this.Marker = Marker
    this.el = el
    this.opts = opts
    return this
  }

  _getPosition() {
    return [this.opts.position.lng, this.opts.position.lat]
  }

  _addToMap(map) {
    this.Marker.addTo(map)
  }

  _removeFromMap() {
    this.Marker.remove()
  }

  _on(event, handler) {
    this.el.addEventListener(event, handler(this.opts))
  }
}

class Circle {
  constructor(opts, map) {
    var center = opts.center
    var radius = opts.radiu / 1000
    var options = { steps: 64, units: 'kilometers', properties: { foo: 'bar' } }
    var cirlceData = turf.circle(center, radius, options)
    // 增加自定义数据源、自定义图层
    map.addSource(opts.id + 'Source', {
      type: 'geojson',
      data: cirlceData
    })

    map.addLayer({
      id: opts.id + 'Layer',
      type: 'fill',
      source: 'polygonSource',
      layout: {},
      paint: {
        'fill-color': 'blue',
        'fill-opacity': 0.6
      }
    })
    this.polygonData = cirlceData
    this.opts = opts
    return this
  }

  _remove(map) {
    map.reoveSource(this.opts.id + 'Source')
    map.reoveLayer(this.opts.id + 'Layer')
  }

  _contain(markers) {
    return markers.filter((e) => {
      return turf.booleanPointInPolygon(turf.point(e._getPosition()), this.polygonData)
    })
  }
}

export default { Map, Marker, Circle }
