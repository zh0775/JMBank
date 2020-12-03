
<template>
  <div id="app">
    <RouteView :keepAlive=true />
  </div>
</template>

<script>
import { domTitle } from '@/utils/domUtil'
import RouteView from '@/layouts/RouteView'
// import { homeTopBar } from '@/components'
export default {
  name: 'App',
  components: {
    RouteView
  },
  created () {
  },
  mounted () {
    window.document.title = domTitle;
  },
  methods: {
    // clickTap (idx) {
    //   console.log('appTap == ', idx);
    // }
  }
}
</script>
  
<style>
#app{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11111;

  color: #d3d6dd;
  background-color: #000000;
  background-size: cover;
  background-position: center center;
}
</style>
