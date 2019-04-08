<template>
  <div>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        transitionName: "",
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.meta.index > from.meta.index) {
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      },
    }
  }
</script>

<style lang="less">
  @import "assets/less/base/base";
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    /*will-change: transform;*/
    transition: all 300ms;
    -webkit-transition: all 300ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    -webkit-transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    -webkit-transform: translate3d(-100%, 0, 0);
  }
</style>
