<template>

  <!-- 全局提示框 -->
  <transition name="confirm-fade">
  <div v-show="visible" class="dialog-tips dialog-center">
    <div>{{message}}</div>
  </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        message: ""
      };
    }
  };
</script>
<style lang="less">
  .dialog-tips{
    position: fixed;
    z-index: 100;
    min-width: 240px;
    padding: 18px 24px;
    white-space: nowrap;
    color: #fff;
    background:rgba(0,0,0,0.8);
    border-radius:10px;
    text-align: center;
  }
  .dialog-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  /* 进入和出去的动画 */
  .confirm-fade-enter-active {
    animation: opacity 0.3s;
  }
  .confirm-fade-leave-active {
    animation: outOpacity 0.2s;
  }
  /* 进来的动画 */
  @keyframes opacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }


  /* 出去的动画 */
  @keyframes outOpacity {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
