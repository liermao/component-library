<template>
  <transition name="confirm-fade">
    <div v-if="isShowConfirm" class="my-confirm" @click.stop="clickFun('clickCancel')">
      <div class="confirm-content-wrap" @click.stop>
        <h3 class="my-confirm-title">{{ titleText }}</h3>
        <p class="my-confirm-content">{{ content }}</p>
        <div class="my-operation">
          <div v-if="type==='confirm'" class="my-cancel-btn" @click="clickFun('clickCancel')">
            <p class="my-btn-text my-border-right">{{ cancelText }}</p>
          </div>
          <div class="confirm-btn" @click="clickFun('clickConfirm')">
            <p class="my-btn-text">{{ confirmText }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isShowConfirm: false, // 用于控制整个窗口的显示/隐藏
        titleText: '操作提示', // 提示框标题
        content: 'Say Something ...', // 提示框的内容
        cancelText: '取消', // 取消按钮的文字
        confirmText: '确认', // 确认按钮的文字
        type: 'confirm', // 表明弹框的类型：confirm - 确认弹窗（有取消按钮）；alert - 通知弹框（没有取消按钮）
        outerData: null // 用于记录外部传进来的数据，也可以给外部监听userBehavior，事件的函数提供判断到底是哪个事件触发的
      }
    },
    methods: {
      show(content, config) {
        this.content = content || 'Say Something ...';
        if (Object.prototype.toString.call(config) === '[object Object]') {
          // 确保用户传递的是一个对象
          this.titleText = config.titleText || '操作提示';
          this.cancelText = config.cancelText || '取消';
          this.confirmText = config.confirmText || '确认';
          this.type = config.type || 'confirm';
          this.outerData = config.data || null
        }
        this.isShowConfirm = true
      },
      hidden() {
        this.isShowConfirm = false;
        this.titleText = '操作提示';
        this.cancelText = '取消';
        this.confirmText = '确认';
        this.type = 'confirm';
        this.outerData = null
      },
      clickFun(type) {
        if (type == "clickConfirm") {
          this.$emit('clickFun', type, this.outerData);
          this.hidden()
        } else {
          this.hidden()
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/base/theme";

  .my-confirm {
    position: fixed;
    z-index: 9999999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* 进入和出去的动画 */
  .confirm-fade-enter-active {
    animation: opacity 0.3s;
  }

  .confirm-fade-enter-active .confirm-content-wrap {
    animation: scale 0.3s;
  }

  .confirm-fade-leave-active {
    animation: outOpacity 0.2s;
  }

  /* 包裹层容器样式 */
  .confirm-content-wrap {
    position: absolute;
    top: 418px;
    left: 0;
    right: 0;
    width: 540px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    z-index: 999;
    user-select: none;
  }

  /* 顶部标题部分 */
  .my-confirm-title {
    margin-top: 32px;
    margin-bottom: 22px;
    font-size: 34px;
    font-weight: 600;
    color: rgba(48, 49, 51, 1);
    line-height: 48px;
    text-align: center;
  }

  /* 中间内容部分 */
  .my-confirm-content {
    padding: 0 44px;
    font-size: 30px;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
    line-height: 42px;
    margin-bottom: 42px;
  }

  /* 底部按钮样式 */
  .my-operation {
    display: flex;
    height: 112px;
    border-top: 1px solid #eee;
  }

  .my-operation .my-cancel-btn, .confirm-btn {
    flex: 1;
  }

  .my-operation .confirm-btn {
    color: @color-main;

  }

  .my-operation .my-btn-text {
    text-align: center;
    font-size: 34px;
    /*margin: 14px 0;*/
    /*padding: 6px 0;*/
    line-height: 112px;;
  }

  /* 其他修饰样式 */
  .my-border-right {
    border-right: 1px solid #eee;
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

  @keyframes scale {
    0% {
      transform: scale(0);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
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
