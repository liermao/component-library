<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot>
      </slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-if="pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev" v-if="prev_next"></div>
    <div class="swiper-button-next" v-if="prev_next"></div>
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar" v-if="scrollbar"></div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.min.css';
  import Swiper from 'swiper';

  export default {
    name: "scrollCard",
    data() {
      return {}
    },
    props: {
      pagination: {
        type: Boolean,
        default: false,
      },
      scrollbar: {
        type: Boolean,
        default: false,
      },
      prev_next: {
        type: Boolean,
        default: false,
      },
    },
    mounted() {
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  }
</script>

<style scoped lang="less">
  .swiper-container {
    width: 100vw;
  }
</style>
