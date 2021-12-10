<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <!-- handleSubmit会帮助我们做一个整体的验证，如果有任何一个没有校验成功的话，
      就不会执行onSubmit中的代码 -->
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <ValidationProvider
            rules="phoneRequired|phoneNumber"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>手机号:</label>
              <input
                type="text"
                placeholder="请输入你的手机号"
                v-model="user.phone"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            rules="codeRequired|codeNumber"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>验证码:</label>
              <input
                type="text"
                v-model="user.code"
                placeholder="请输入验证码"
              />
              <input
                type="button"
                value="获取验证码"
                @click="getCode"
                style="width: 90px"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            rules="passRequired|passwordReg"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>登录密码:</label>
              <input
                type="text"
                v-model="user.password"
                placeholder="请输入你的登录密码"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            :rules="`passRequired|passwordReg|rePassReg:${user.password}`"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="content">
              <label>请确认密码:</label>
              <input
                type="text"
                v-model="user.rePassword"
                placeholder="请输入确认密码"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            rules="agree"
            mode="lazy"
            tag="div"
            v-slot="{ errors }"
          >
            <div class="controls">
              <input name="m1" v-model="user.isAgree" type="checkbox" />
              <span>同意协议并注册《尚品汇用户协议》</span>
              <span class="error-msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div class="btn">
            <!-- 被单击的时候，能够触发form标签的submit事件 -->
            <button>完成注册</button>
            <!-- <input type="submit"> -->
          </div>
        </form>
      </ValidationObserver>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
// extend 是这个插件给我们提供的自定义验证规则的一个API
// import { extend } from 'vee-validate';
import { required } from "vee-validate/dist/rules";
import { phoneNumberReg, codeReg, passwordReg } from "@/utils/reg.js";
import { reqCode, reqRegister } from "@/api";
// 1. 校验手机号输入不能为空
extend("phoneRequired", {
  ...required,
  message: "手机号不能为空",
});
extend("phoneNumber", {
  validate(val) {
    return phoneNumberReg.test(val); // 验证输入的内容是否符合校验规则
  },
  message: "手机号码格式不正确,请重新输入",
});

// 1. 校验手机号输入不能为空
extend("codeRequired", {
  ...required,
  message: "验证码不能为空",
});
extend("codeNumber", {
  validate(val) {
    return codeReg.test(val); // 验证输入的内容是否符合校验规则
  },
  message: "验证码不符合要求，应该是6位数字",
});

// 3. 校验密码框是否为空
extend("passRequired", {
  ...required,
  message: "密码不能为空",
});
extend("passwordReg", {
  validate(val) {
    return passwordReg.test(val); // 验证输入的内容是否符合校验规则
  },
  message: "密码格式不正确，应该是6-18的大小写字母和数字组合",
});
// 4. 再次输入的密码和之前的密码是否一致
extend("rePassReg", {
  validate(val, { password }) {
    return val === password;
  },
  message: "两次密码输入的不一致,请重新输入",
  params: ["password"], // 接收一下
});

// 5. 是否勾选协议的校验
extend("agree", {
  validate(val) {
    return val;
  },
  message: "请勾选协议",
});
export default {
  name: "Register",
  data() {
    return {
      user: {
        phone: "", // 手机号
        password: "", // 密码
        rePassword: "", // 重复密码
        code: "", // 验证码
        isAgree: false, // 是否同意用户协议
      },
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    // 1. 获取手机验证码
    async getCode(event) {
      const result = await reqCode(this.user.phone);
      if (result.code === 200) {
        console.log(event.target);
        // console.log(result);
        // 填充到对应的验证输入框即可
        // event.target.value = result.data
        this.user.code = result.data;
      } else {
        console.log(result.message);
      }
    },
    async submit() {
      // 在这个位置 去发请求注册账号
      const { phone, password, code } = this.user;
      // console.log(phone,p);
      const result = await reqRegister({ phone, password, code });
      if (result.code === 200) {
        // 注册成功则要跳转到login页面
        this.$router.push("/login");
      } else {
        console.log(result.message);
      }
    },
    //
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>