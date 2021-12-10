<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>
      注册新用户
      <span class="go"
        >我有账号，去 <router-link to="login" >登陆</router-link>
      </span>
    </h3>

    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider
          rules="phoneRequired|phoneNumber"
          v-slot="{ errors }"
          mode="lazy"
          tag="div"
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
          v-slot="{ errors }"
          mode="lazy"
          tag="div"
        >
          <div class="content">
            <label>验证码:</label>
            <input type="text" v-model="user.code" placeholder="请输入验证码" />
            <input
              type="button"
              value="获取验证码"
              @click="getCode"
              style="width: 100px;disabled:true"
            />
            <!-- <img
            ref="code"
            src="http://182.92.128.115/api/user/passport/code"
            alt="code"
          /> -->
            <span class="error-msg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <ValidationProvider
          class="content"
          rules="passRequired|passwordReg"
          v-slot="{ errors }"
          mode="lazy"
          tag="div"
        >
          <label>登录密码:</label>
          <input
            type="text"
            placeholder="请输入你的登录密码"
            v-model="user.password"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="content"
          :rules="`passRequired|passwordReg|rePassNumber:${user.password}|`"
          v-slot="{ errors }"
          mode="lazy"
          tag="div"
        >
          <label>确认密码:</label>
          <input
            type="text"
            placeholder="请输入确认密码"
            v-model="user.rePassword"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="controls"
          rules="agree"
          v-slot="{ errors }"
          mode="lazy"
          tag="div"
        >
          <div>
            <input name="m1" type="checkbox" v-model="user.isAgree" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{ errors[0] }}</span>
          </div>
          </ValidationProvider>
          <div class="btn">
            <button>完成注册</button>
          </div>
        
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { phoneNumberReg, passwordReg, codeReg } from "@/utils/reg.js";
import { reqCode,reqRegister } from "@/api";
// 1. 校验手机号输入不能为空
extend("phoneRequired", {
  ...required,
  message: "请输入手机号",
});
extend("phoneNumber", {
  // 自己写校验规则 返回true表示校验成功 false表示失败
  validate(val) {
    // val表示要验证的数据
    return phoneNumberReg.test(val);
  },
  message: "手机号格式不正确",
});

// 2. 校验手机号输入不能为空
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

// 密码的验证规则
extend("passRequired", {
  ...required,
  message: "密码不能为空",
});
extend("passwordReg", {
  // 自己写校验规则 返回true表示校验成功 false表示失败
  validate(val) {
    // val表示要验证的数据
    return passwordReg.test(val);
  },
  message: "密码格式不正确",
});

// 重复密码的验证规则
extend("rePassNumber", {
  // 自己写校验规则 返回true表示校验成功 false表示失败
  validate(val, { password }) {
    // val表示要验证的数据
    return val === password;
  },
  message: "两次密码不一样",
  params: ["password"],
});

// 是否勾选了同意协议
extend("agree", {
  // 自己写校验规则 返回true表示校验成功 false表示失败
  validate(val) {
    // val表示要验证的数据
    return val;
  },
  message: "请勾选用户协议",
});
export default {
  name: "Register",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    async onSubmit() {
      //在这个位置  去发请求注册账号
      const {phone,password,code}=this.user
      const result =await reqRegister({phone,password,code})
      if(result.code===200){
        //注册成功则要跳转到login页面
        this.$router.push('/login')
      }else{
        console.log(result.message);
      }
    },
    async getCode(event) {
      if (this.user.phone === "") {
        // alert("请输入手机号");
        document.documentElement.style.disabled = true.user;
      } else {
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
      }
    },
  },
  data() {
    return {
      user: {
        phone: "",
        password: "",
        rePassword: "",
        code: "",
        isAgree: false, // 是否同意用户协议
      },
    };
  },
};
</script>

<style lang='less' scoped>
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
</style>