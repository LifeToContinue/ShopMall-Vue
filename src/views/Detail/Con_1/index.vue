<template>
  <!-- 主要内容区域 -->
  <section class="con">
    <!-- 导航路径区域 -->
    <div class="conPoin">
      <div class="conPoin">
        <a href="###">手机、数码、通讯</a>
        <a href="###">手机</a>
        <a href="###">Apple苹果</a>
        <a>iphone 6S系类</a>
      </div>
    </div>
    <!-- 主要内容区域 -->
    <div class="mainCon">
      <!-- 左侧放大镜区域 -->
      <div class="previewWrap">
        <!--放大镜效果-->
        <div class="preview">
          <div class="jqzoom">
            <img src="./images/s1.png" />
          </div>
        </div>
        <!--下方的缩略图-->
        <div class="specScroll">
          <!--左按钮-->
          <a class="prev">&lt;</a>
          <!-- 中间可滑动区域 -->
          <div class="items">
            <div class="itemsCon"></div>
          </div>
          <!--右按钮-->
          <a class="next">&gt;</a>
        </div>
      </div>
      <!-- 右侧选择区域布局 -->
      <div class="InfoWrap">
        <div class="goodsDetail"></div>

        <div class="choose">
          <div class="chooseArea">
            <div class="choosed"></div>
          </div>

          <div class="cartWrap">
            <div class="controls">
              <input autocomplete="off" value="1" class="itxt" />
              <a href="###" class="plus">+</a>
              <a href="###" class="mins">-</a>
            </div>
            <div class="add">
              <a href="###" target="_blank">加入购物车</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Con_1",
};
</script>

<style lang='less' scoped>
.con {
  width: 1200px;
  margin: 15px auto 0;
  .conPoin {
    padding: 9px 15px 9px 0;
    & > a + a:before {
      content: "/\00a0";
      padding: 0 5px;
      color: #ccc;
    }
  }
  .mainCon {
    overflow: hidden;
    margin: 5px 0 15px;
    .previewWrap {
      float: left;
      width: 400px;
      position: relative;
      .preview {
        width: 400px;
        height: 400px;
        border: 1px solid #dfdfdf;
        .jqzoom {
          cursor: pointer;
          width: 400px;
          height: 400px;
          position: relative;
          img {
            width: 100%;
          }
          .mask {
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.5);
            position: absolute;
            left: 0;
            top: 0;
            border: 1px solid #ddd;
          }
        }
        .maxbox {
          width: 400px;
          height: 400px;
          position: absolute;
          left: 420px;
          top: 0px;
          overflow: hidden;
          z-index: 20;
          border: 1px solid #ddd;
          img {
            width: 800px;
            height: 800px;
            display: block;
          }
        }
      }
      .specScroll {
        margin-top: 5px;
        width: 400px;
        overflow: hidden;
        .prev,
        .next {
          text-align: center;
          width: 10px;
          height: 54px;
          line-height: 54px;
          border: 1px solid #ccc;
          background: #ebebeb;
          cursor: pointer;
        }
        .prev {
          float: left;
          margin-right: 4px;
        }
        .next {
          float: right;
        }
        .items {
          float: left;
          position: relative;
          width: 372px;
          height: 56px;
          overflow: hidden;
          .itemsCon {
            position: absolute;
            width: 9999px;
            height: 56px;
            left: 0;
            img {
              float: left;
              text-align: center;
              border: 1px solid #ccc;
              padding: 2px;
              width: 50px;
              height: 50px;
              margin-right: 20px;
            }
          }
        }
      }
    }
    .InfoWrap {
      width: 700px;
      float: right;
      .InfoName {
        font-size: 14px;
        line-height: 21px;
        margin-top: 15px;
      }
      .news {
        color: #e12228;
        margin-top: 15px;
      }
      .priceArea {
        background: #fee9eb;
        padding: 7px;
        margin: 13px 0;
        .priceArea1 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            float: left;
            margin-right: 15px;
          }
          .price {
            float: left;
            color: #c81623;
            i {
              font-size: 16px;
            }
            em {
              font-size: 24px;
              font-weight: 700;
            }
            span {
              font-size: 12px;
            }
          }
          .remark {
            float: right;
          }
        }
        .priceArea2 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            margin-right: 15px;
            float: left;
          }
          .fixWidth {
            width: 520px;
            float: left;
            .red-bg {
              background: #c81623;
              color: #fff;
              padding: 3px;
            }
            .t-gray {
              color: #999;
            }
          }
        }
      }
      .support {
        border-bottom: 1px solid #ededed;
        padding-bottom: 5px;
        .supportArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            margin-right: 15px;
            float: left;
          }
          .fixWidth {
            width: 520px;
            float: left;
            color: #999;
          }
        }
      }
      .choose {
        .chooseArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .choosed {
            mark {
              height: 30px;
              display: inline-block;
              line-height: 30px;
              background-color: snow;
              border: 1px solid #ddd;
              padding: 0 20px;
              margin-right: 20px;
              a {
                font-size: 12px;
                color: red;
                margin-left: 20px;
                cursor: pointer;
              }
            }
          }
          dl {
            overflow: hidden;
            margin: 13px 0;
            dt {
              margin-right: 15px;
              float: left;
            }
            dd {
              float: left;
              margin-right: 5px;
              color: #666;
              line-height: 24px;
              padding: 2px 14px;
              border-top: 1px solid #eee;
              border-right: 1px solid #bbb;
              border-bottom: 1px solid #bbb;
              border-left: 1px solid #eee;
              &:nth-of-type(1) {
                color: red;
              }
            }
          }
        }
        .cartWrap {
          .controls {
            width: 48px;
            position: relative;
            float: left;
            margin-right: 15px;
            .itxt {
              width: 38px;
              height: 37px;
              border: 1px solid #ddd;
              color: #555;
              float: left;
              border-right: 0;
              text-align: center;
            }
            .plus,
            .mins {
              width: 15px;
              text-align: center;
              height: 17px;
              line-height: 17px;
              background: #f1f1f1;
              color: #666;
              position: absolute;
              right: -8px;
              border: 1px solid #ccc;
            }
            .mins {
              right: -8px;
              top: 19px;
              border-top: 0;
            }
            .plus {
              right: -8px;
            }
          }
          .add {
            float: left;
            a {
              background-color: #e1251b;
              padding: 0 25px;
              font-size: 16px;
              color: #fff;
              height: 36px;
              line-height: 36px;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>