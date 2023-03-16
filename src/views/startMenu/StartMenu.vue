<template>
  <div class="StartMenu">
    <Center />
  </div>
</template>
<script>
import Center from './modules/Center'
export default {
  name: 'App',
  components: {
    Center
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
.StartMenu {
  background-color: #fff;
  height: 100%;
  font-size: 20px;
  position: relative;
  overflow: hidden;
}
</style>
