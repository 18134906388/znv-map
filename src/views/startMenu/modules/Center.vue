<template>
  <div class="Center">
    <MapView />
  </div>
</template>

<script>
import MapView from '@/components/map/MapView'
export default {
  components: {
    MapView
  },
  data () {
    return {
      reservoirList: []
    }
  }
}
</script>

<style lang="scss">
.Center {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
