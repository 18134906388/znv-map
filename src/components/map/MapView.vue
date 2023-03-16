<template>
  <div class="map-view">
    <div class="znvmap" id="map-container"></div>
    <MapFilter />
  </div>
</template>

<script>
import ZnvMap from '@/components/map/znvMap-arcgis'
import { getIconByName } from './mapIcon'
import axios from '@/utils/request'
import MapFilter from './MapFilter'
// import moment from 'moment'
// import qs from 'qs'
export default {
  components: { MapFilter },
  data() {
    return {
    }
  },
  mounted() {
    setTimeout(() => {
      this.initMap()
    }, 1000)
  },
  watch: {
    '$store.getters.windowInfoDetail': {
      handler(v) {
        this.showWindowInfoDetail(v.data)
      }
    }
  },
  methods: {
    initMap() {
      // 初始化地图
      ZnvMap.start('map-container', {
        zoom: 1,
        minZoom: 1,
        maxZoom: 20,
        center: [120.422167, 36.117018]
      }).then(() => {
        // 设置地图中心点和轮廓
        this.centerRegionalContour()
        // 加载点位
        this.loadMapPoints()
      })
    },
    loadMapPoints() {
      // 区委
      this.loadquweiPoint({ isHidden: false })
    },
    // 区委
    loadquweiPoint (opts) {
      axios.get('/mock/queryquwei.json').then((res) => {
        let pointList = this.quweiPointProcess(res.data.data)
        ZnvMap.loadPointLayer(pointList, opts)
      })
    },
    quweiPointProcess (data) {
      return data.map((e, index) => {
        let iconInfo = getIconByName(e.name)
        e.type = e.name
        let temp = {
          id: '区委_' + e.id,
          icon: iconInfo,
          title: e.name,
          position: { lng: e.gpsx, lat: e.gpsy },
          size: { width: 42, height: 48 },
          offset: { x: -21, y: -48 },
          extData: e
        }
        return temp
      })
    },
    // 设置地图中心点和轮廓
    centerRegionalContour() {
      this.gridContour()
    },
    gridContour() {
      axios.get('/mock/grid.json').then((res) => {
        res.data.data.forEach((e) => {
          let option = {
            fillColor: '#5333ed',
            strokeColor: '#48A7FF',
            strokeWeight: 2,
            fillOpacity: 0.5
          }
          option.extData = e
          ZnvMap.loadPolygonLayer('轮廓_' + e.id, e.outlineGps, option)
        })
      })
    }
  }
}
</script>

<style lang="scss">
.map-view {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  .znvmap {
    height: 100%;
    position: relative;
    background: #fff;
  }
  .twinkle-animation {
    animation: twinkle 1s infinite;
  }
  .twinkle-animation-10s {
    animation: twinkle 1s 10;
  }
  @keyframes twinkle {
    0% {
      transform: scale(0.7);
      transform-origin: center bottom;
      opacity: 0;
    }
    50% {
      transform: scale(2);
      transform-origin: center bottom;
      opacity: 1;
    }
    100% {
      transform: scale(0.7);
      transform-origin: center bottom;
      opacity: 0;
    }
  }
}
</style>
