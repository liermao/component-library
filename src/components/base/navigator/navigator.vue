<template>
  <div class="tab" ref="tab">
    <ul class="tab_content" ref="tabWrapper">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {}
    },
    created() {
      this.$nextTick(() => {
        this.InitTabScroll();
      });
    },
    methods: {
      InitTabScroll() {
        let scrollWidth = 0;
        for (let i = 0; i < this.$refs.tabWrapper.children.length; i++) {
          let child = this.$refs.tabWrapper.children[i].scrollWidth;
          scrollWidth += child;
        }
        this.$refs.tabWrapper.style.width = scrollWidth + "px";
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.tab, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh()
          }
        });
      }
    },
    watch: {
      winChips: {
        handler(newValue, oldValue) {
          for (let i = 0; i < newValue.length; i++) {
            if (oldValue[i] != newValue[i]) {
              console.log(newValue)
            }
          }
        },
        deep: true
      }
    }

  };
</script>
<style lang="less" scoped>
  .tab {
    width: 100vw;
    overflow: hidden;
    .tab_content {
      display: flex;
    }
  }
</style>
