<template>
  <div class="spec-preview">
    <img ref='img1' :src="skuInfo.skuDefaultImg" />
    <div class="event" @mousemove="move"></div>
    <!-- 右侧的大图  这个大图和左边的图片其实是一个，只不过是放大2倍 -->
    <div class="big">
      <img  ref='img2'
        :src="skuInfo.skuDefaultImg"
        :style="{ left: -2*left + 'px', top:  -2*top + 'px' }"
      />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" :style="{ left: left + 'px', top: top + 'px' }"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Zoom",
  computed: {
    ...mapGetters("detail", ["skuInfo"]),
  },
  data() {
    return {
      left: 0,
      top: 0,
    };
  },
  methods: {
    move(event) {
      // 鼠标移动时触发的事件 只要事件一触发就会有一个事件对象
      // console.log(event);
      /**
       * 思路：
       *  1. 遮罩层之所以能够移动是因为有绝对定位，是相对于父元素盒子进行的移动
       *  2. 有限定范围，不能超出父盒子
       *  3. 要实现移动，得借助于鼠标的移动事件，当鼠标一移动就可以从事件对象中获取当前鼠标的坐标值
       *  4. 在鼠标不断移动的同时，将坐标值实时的给遮罩层的left top
       */
      let x = event.offsetX - 100;
      if (x < 0) {
        x = 0;
      }
      if (x > 200) x = 200;
      this.left = x;
      let y = event.offsetY - 100;
      if (y < 0) {
        y = 0;
      }
      if (y > 200) y = 200;
      this.top = y;
    },
  },
  mounted() {
    // 1. 实现单击小图显示大图效果
    this.$bus.$on("get-image", (imgUrl) => {
      // console.log("imgUrl", imgUrl);
      // console.log(this.$refs);
      this.$nextTick(() => {
        this.$refs.img1.src = imgUrl;
        this.$refs.img2.src = imgUrl;
      });
    });
  },
  beforeDestroy(){
     this.$bus.$off('get-image') // 销毁自定义事件
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>