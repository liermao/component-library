<template>
  <div>
    <div ref="viewport" class="navigator-component">
      <scroll ref="scroll" direction="horizontal">
        <ul class="tab-list" ref="tabList">
          <router-link
            v-for="(item,index) in navList"
            tag="li"
            :to="{path: item.path}"
            class="tab-item"
            :key="index"
          >
            <span class="tab-name">{{item.name}}</span>
          </router-link>
        </ul>
      </scroll>
    </div>
    <div class="content" :style="{height:contentHeight+'px'}" ref="content">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from '../base/scroll/scroll'

  const EVENT_CHANGE = 'change';
  export default {
    data() {
      return {
        contentHeight: null,
        transitionName: "",
        currentTab: 2,
        current: 1,
        navList: [
          {id: 1, name: 'xxx1', path: "/scrollModal/1"},
          {id: 2, name: 'xxx2', path: "/scrollModal/2"},
          {id: 3, name: 'xxx3', path: "/scrollModal/3"},
          {id: 4, name: 'xxx4', path: "/scrollModal/4"},
        ],
      }
    },
    mounted() {
      this.contentHeight = document.documentElement.clientHeight - this.$refs.viewport.clientHeight;
      this._initTabListWidth();
      this.$emit(EVENT_CHANGE);
      if (this.currentTabIndex === null) {
        this.current = this.currentTab
      } else {
        this.current = this.currentTabIndex
      }
      setTimeout(() => {
        this._adjust(this.current)
      }, 500);

      this.initTouchedEvent();
    },
    methods: {
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
      },
      touchedstartHandler(e) {
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
      },
      touchendHandler(e) {
        var _this = this;
        let direction = this.startX - e.changedTouches[0].pageX;
        let directionY = this.startY - e.changedTouches[0].pageY;
        let disXY = Math.abs(direction) > Math.abs(directionY);
        let nowRouteIndex = 0;
        _this.navList.forEach((v, index) => {
          if (v.path == this.$route.path) {
            nowRouteIndex = index;
          }
        });
        if (disXY && direction >= 0 && nowRouteIndex < this.navList.length - 1) {
          this.$router.push({'path': this.navList[nowRouteIndex + 1].path});
        }
        if (disXY && direction < 0 && nowRouteIndex > 0) {
          this.$router.push({'path': this.navList[nowRouteIndex - 1].path});
        }
      },
      initTouchedEvent() {
        this.$refs.content.addEventListener('touchstart', this.touchedstartHandler.bind(this));
        this.$refs.content.addEventListener('touchend', this.touchendHandler.bind(this));
      },
    },
    components: {
      Scroll
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
<style lang='less'>
  @import "../../assets/less/base/theme";

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
            }
          }
          li.active {
            span {
              transform: scale(1.04) !important;
              font-weight: 600 !important;
              color: @color-main !important;
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

