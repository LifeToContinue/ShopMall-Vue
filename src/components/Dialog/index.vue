<template>
  <!-- self只触发自己身上的事件，不受其它影响 -->
  <div class="dialog" v-show="visible" @click.self="closeDialog">
    <div class="dialog-wrap">
      <div class="dialog-header">
        <slot name="header"></slot>
        <button @click="closeDialog">X</button>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  // props:['visibile']
  props: {
    // 完整写法
    visible: {
      type: Boolean, // 限定类型
      required: true, // 必须传
    },
  },
  methods: {
    closeDialog() {
      // this.$emit("update", false);
      this.$emit("update:visible", false);
    },
  },
  watch: {
    visible: {
      immediate: true, // 一开始立即就监视
      handler() {
        if (this.visible) {
          // document.body 标签标签
          // document.documentElement 表示html标签
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .dialog-wrap {
    width: 460px;
    height: 150px;
    position: absolute;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 12px 20px;
    box-sizing: border-box; // 内减模式

    .dialog-header {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 18px;
      }
      button {
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
      }
    }

    .dialog-body {
      margin-top: 26px;
      text-align: center;
      font-size: 18px;
    }

    .dialog-footer {
      position: absolute;
      right: 30px;
      bottom: 12px;
      .btn {
        width: 46px;
        height: 32px;
        margin-left: 10px;
        cursor: pointer;
        font-size: 14px;
        outline: none;
        &.primary {
          background-color: rgb(102, 177, 255);
          color: #fff;
        }
      }
    }
  }
}
</style>