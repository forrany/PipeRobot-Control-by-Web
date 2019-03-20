<template>
  <div id="app">
    <transition name="el-fade-in-linear">
        <v-snap ref="imgsnap" v-show="Snap"/>
    </transition>
    <el-container id="root-hook">
        <el-header >
          <h2>管道机器人控制系统</h2>
        </el-header>
        <el-main id="content" >
          <router-view/>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import snapshot from './components/Snapshot'
import moment from 'moment'

export default {
  name: 'App',
  components:{
    'v-snap':snapshot
  },
  data() {
    return {
      Snap: false,
    }
  },
  mounted() {
    var self = this;
    this.$root.$on('showSnap',function() {
      self.$refs.imgsnap.newCapture();
      self.Snap = true;
      //self.$refs.imgsnap.snapAdd = self.$refs.imgsnap.stable;
    });
    this.$root.$on('closeSnap',function() {
      self.Snap = false;
    });
    this.$root.$on('updateDate',function() {
      self.$refs.imgsnap.currentDate = moment().format('YY/MM/DD, hh:mm:ss');
    })
  },
}
</script>

<style lang="scss">
  *:not(input) {
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  }
  html,body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
  .el-container {
      height: 100%;
  }
  .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
      h2 {
        color:#FFFFFF
      }
  }
  #content {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
    padding: 0;
    @media only screen and (min-width: 1200px) {
      padding-top:30px;
    }
  }
</style>