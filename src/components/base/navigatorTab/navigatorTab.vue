<template>
  <div ref="viewport" class="navigator-component">
    <scroll ref="scroll" direction="horizontal">
      <ul class="tab-list" ref="tabList">
        <li v-for="item in navList" class="tab-item" @click="selectNav(item)" :class="{'active':isCurrentTab(item.id)}">
          <slot>
            <span class="tab-name" :class="{'link-active':isCurrentTab(item.id)}">{{item.name}}</span>
          </slot>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from '../base/scroll.vue'

  const EVENT_CHANGE = 'change';
  export default {
    props: {
      navList: {
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
        currentTab: 2,
        current: 1
      }
    },
    mounted() {
      this._initTabListWidth();
      this.$emit(EVENT_CHANGE);
      if (this.currentTabIndex === null) {
        this.current = this.currentTab
      } else {
        this.current = this.currentTabIndex;
      }
      setTimeout(() => {
        this._adjust(this.$store.getters.getChangeTabNum)
      }, 500)
    },
    methods: {
      isCurrentTab(index) {
        return index === this.$store.getters.getChangeTabNum
      },
      selectNav(item) {
        this.$store.dispatch('getNewNum', item.id);
        this.current = item.id;
        this._adjust(item.id);
        this.$emit(EVENT_CHANGE, item);
      },
      _initTabListWidth() {
        const tabList = this.$refs.tabList;
        const items = tabList.children;
        let width = 0;
        for (let i = 0; i < items.length; i++) {
          width += items[i].clientWidth
        }
        tabList.style.width = (width + 1) + 'px'
      },
      _adjust(tabId) {
        const viewportWidth = this.$refs.viewport.clientWidth;
        const tabListWidth = this.$refs.tabList.clientWidth;
        const minTranslate = Math.min(0, viewportWidth - tabListWidth);
        const middleTranslate = viewportWidth / 2;
        const items = this.$refs.tabList.children;
        let width = 0;
        this.navList.every((item, index) => {
          if (item.id === tabId) {
            return false
          }
          width += items[index].clientWidth;
          return true
        });
        let translate = middleTranslate - width;
        translate = Math.max(minTranslate, Math.min(0, translate));
        this.$refs.scroll.scrollTo(translate, 0, 300)
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style lang='less'>
  @import "../../../assets/less/base/theme";

  .navigator-component {
    width: 686px;
    margin-left: 32px;
    position: relative;
    .list-wrapper {
      background: none;
      .scroll-content {
        //用于横向滚动
        display: inline-block;
        .tab-list {
          margin: 0 auto;
          .tab-item {
            display: inline-block;
            line-height: 108px;
            position: relative;
            transition: all 0.2s;
            .tab-name {
              display: block;
              position: relative;
              padding: 0 25px 0 25px;
              font-size: 34px;
              font-weight: 400;
              color: @color-text-2;
              &.link-active {
                transform: scale(1.04);
                font-weight: 600;
                color: @color-main;
              }
            }
          }
          li::before {
            content: "";
            position: absolute;
            left: 100%;
            width: 0;
            height: 95%;
            border-bottom: 4px solid @color-main;
            transition: 0.2s all cubic-bezier(.73, .01, .28, .99);
          }
          li:hover::before {
            width: 100%;
            left: 0;
          }
          li:hover ~ li::before {
            left: 0;
          }
          .active ~ li::before {
            left: 0;
          }
          .active::before {
            width: 100%;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
</style>

