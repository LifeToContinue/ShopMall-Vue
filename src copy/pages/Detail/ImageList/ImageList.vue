<template>
  <div class="swiper-container skuImg-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage,index) in skuInfo.skuImageList"
        :key="skuImage.id"
      >
        <img :src="skuImage.imgUrl" :class="{active:currentImg == index}" @click="handlerClick(skuImage.imgUrl,index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapGetters } from "vuex";
export default {
  name: "ImageList",
  data(){
    return {
      currentImg:''
    }
  },
  computed: {
    ...mapGetters("detail", ["skuInfo"]),
  },
  watch: {
    skuInfo() {
      // 只要这个bannerList数据一发生了变化就立即启用swiper
      // 这个数据发生变化指的是bannerList由原来的空数组变成存有真正数据的数组
      // this.$nextTick 可以保证页面中的数据是最新的
      this.$nextTick(() => {
        var mySwiper = new Swiper(".skuImg-container", {
          // direction: "vertical", // 垂直切换选项
          slidesPerView: "auto", // 显示几张图片
          spaceBetween: 100, // 两张图片之间的间距
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
  methods:{
    handlerClick(imgUrl,index){
      this.$bus.$emit('get-image',imgUrl)

      // 更新对应的索引值
      this.currentImg = index
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>