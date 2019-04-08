<template>
  <div class="header" :style="{height:height+'vw',paddingTop:paddingTop+'vw'}" ref="topInfo">
    <div class="header-left">
      <span :class="leftIcon" @click="headLeftFun"></span>
    </div>
    <div class="header-title">
      <span>{{title}}</span>
    </div>
    <div class="header-right">
      <span :class="rightIcon" @click='headRihtFun'>{{rightText}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "header",
    //传入相对应得图标以及图表对应的方法
    data() {
      return {
        height: null,
        paddingTop: null,
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      leftIcon: {
        type: String,
        default: ''
      },
      rightIcon: {
        type: String,
        default: ''
      },
      rightText: {
        type: String,
        default: ''
      }
    },
    methods: {
      headLeftFun() {
        this.$emit('leftFun');
      },
      headRihtFun() {
        this.$emit('rightFun')
      }
    },
    mounted() {
    }
  }
</script>
<style scoped lang="less">
  @import "../../../assets/less/base/theme";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 750px;
    height: 88px;
    background: #fff;
    display: flex;
    z-index: 1;
    color: rgba(48, 49, 51, 1);
    box-shadow: 0px 2px 4px 0px rgba(163, 185, 224, 0.08);
    > div {
      flex: 1;
      line-height: 88px;
      span {
        line-height: 88px;
        height: 100%;
        padding: 0 32px;
        font-size: 34px;
      }
    }
    .header-title {
      text-align: center;
      flex: 2;
      span {
        font-size: 34px;
      }
    }
    .header-left {
      text-align: left;
    }
    .header-right {
      text-align: right;
    }
  }

  .left-icon-show {
    display: none;
  }

</style>
