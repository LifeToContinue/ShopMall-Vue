<template>
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
  props: {
    visible: {
      type: Boolean,
      required: true, //必须传
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler() {
        if (this.visible) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      },
    },
  },
};
</script>

<style lang='less' scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .dialog-wrap {
    width: 460px;
    height: 200px;
    position: absolute;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 12px 20px;
    box-sizing: border-box;

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
        background-color: #fff;
      }
    }

    .dialog-body {
      margin-top: 35px;
      height: 36px;
      text-align: center;
      font-size: 20px;
    }

    .dialog-footer {
      position: absolute;
      right: 22px;
      bottom: 12px;
      .btn {
        width: 70px;
        height: 28px;
        margin-left: 10px;
        cursor: pointer;
        font-size: 14px;
        outline: none;
        border: none;

        &.primary {
          background-color: #63b5ff;
          color: white;
        }
      }
    }
  }
}
</style>