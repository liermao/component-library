<template>
  <div>
    <div class="tab-header" ref="tabHeader">
      <div
        class="tab-header-list"
        v-for='(item, index) in tabList'
        :class="{'active':isCurrentTab(item.id)}"
        @click="selectTab(item)"
        :style="{width:width+'px'}"
        :key="index">
        <slot>
          <span class="tab-name" :class="{'link-active':isCurrentTab(item.id)}">{{item.name}}</span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const EVENT_CHANGE = 'tabChange';
  export default {
    props: {
      tabList: {
        type: Array,
        default() {
          return [{
            id: 1,
            name: 'default'
          }]
        }
      },
      currentTabIndex: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        currentTab: 1,
        current: 1,
        width: 500
      }
    },
    mounted() {
      this.$emit(EVENT_CHANGE);
      if (this.currentTabIndex === null) {
        this.current = this.currentTab
      } else {
        this.current = this.currentTabIndex
      }
      this.width = this.$refs.tabHeader.clientWidth / this.tabList.length;
    },
    methods: {
      isCurrentTab(index) {
        return index === this.current
      },
      selectTab(item) {
        this.current = item.id;
        this.$emit(EVENT_CHANGE, item);
      },
    },
    components: {}
  }
</script>
<style scoped lang='less'>
  @import "../../assets/less/base/theme";

  .tab-header {
    display: flex;
    width: 100vw;
    height: 100px;
    line-height: 100px;
    .tab-header-list {
      text-align: center;
      position: relative;
      transition: all 0.2s;
      span {
        color: @color-text-2;
      }
    }
  }

  .tab-header-list::before {
    content: "";
    position: absolute;
    left: 100%;
    width: 0;
    height: 95%;
    border-bottom: 4px solid @color-main;
    transition: 0.2s all cubic-bezier(.73, .01, .28, .99);
  }

  .tab-header-list:hover::before {
    width: 100%;
    left: 0;
  }

  .tab-header-list:hover ~ .tab-header-list::before {
    left: 0;
  }

  .active {
    color: @color-main;
    span {
      font-weight: 600;
      color: @color-main !important;
    }
  }

  .active ~ .tab-header-list::before {
    left: 0;
  }

  .active::before {
    width: 100%;
    left: 0;
    top: 0;
  }
</style>

