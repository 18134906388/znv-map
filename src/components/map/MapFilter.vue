<template>
  <ul class="MapFilter">
    <li v-for="item in mapIcon" :key="item.name" @click="changeType(item.name)">
      <img :src="item.icon" alt="">
      <span class="label">{{item.label}}</span>
    </li>
  </ul>
</template>

<script>
import { mapIcon } from './mapIcon'
import ZnvMap from '@/components/map/znvMap'
export default {
  data() {
    return {
      mapIcon: mapIcon
    }
  },
  methods: {
    changeType(type) {
      ZnvMap.hideAllMarkers()
      ZnvMap.showMarkersByType(type)
    }
  }
}
</script>

<style lang="scss">
.MapFilter{
  width: 176px;
  height: 162px;
  background: rgba(3,45,88,0.8000);
  border: 2px solid #0B69C8;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #FFFFFF;
  padding-left: 8px;
  li{
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    img{
      width: 22px;
    }
    .label{
      margin-left: 9px;
    }
  }
}
</style>
