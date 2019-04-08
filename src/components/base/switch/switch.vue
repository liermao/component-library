<template>
  <div>
    <span class="switch" :class="{'switch-on' : checked}" :value="value" @click="toggle"></span>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        checked: this.value
      }
    },
    watch: {
      checked(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      toggle() {
        this.checked = !this.checked;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/base/theme";

  .switch {
    display: block;
    position: relative;
    width: 82px;
    height: 50px;
    border: 1px solid rgba(220, 223, 230, 1);
    outline: 0;
    border-radius: 50px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }

  .switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 50px;
    border-radius: 50px;
    background-color: #FDFDFD;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }

  .switch:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    border-radius: 50px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }

  .switch-on {
    border-color: @color-main;
    background-color: @color-main;
  }

  .switch-on:before {
    content: "";
    border-color: @color-main;
    background-color: @color-main;
  }

  .switch-on:after {
    content: "";
    transform: translateX(30px);
  }
</style>
