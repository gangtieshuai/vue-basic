<!--
 * @Author: 郭德纲
 * @Date: 2020-11-10 11:03:24
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-23 16:28:24
 * @FilePath: \ccb-web\src\pages\login\login.vue
 * @Description: file content
-->

<template>
  <div class="bg">
    <img class="img-left-bg" src="../../assets/loginImg/bg_left.png" alt srcset />
    <img class="img-right-bg" src="../../assets/loginImg/bg_right.png" alt srcset />
    <div class="form-bg">
      <a-row class="form-body">
        <a-col :offset="3" :sm="12" :md="6" :lg="6" :xl="6">
          <h2 class="title">登录</h2>
          <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
            <a-form-item>
              <a-input v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]" placeholder="Username">
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]" type="password" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]">记住我</a-checkbox>
              <a class="login-form-forgot" href>忘记密码</a>
              <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :offset="3" :span="8">
          <img class="login-img" src="../../assets/loginImg/image_denglu.png" alt srcset />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { LoginFormAPI, getUserinfo } from 'Common/api'
import { setToken, setAuth } from 'Common/utils'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'xxxxx'
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received1 values of form: ', values)
          LoginFormAPI().then(res => {
            getUserinfo().then(result => {
              setToken(res.resultdata)
              setAuth(result.resultdata)
              this.$router.push('/')
              console.log('sss');
            }).catch(err => console.log(err))
          }).catch(err => console.log(err))
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background: url('../../assets/loginImg/login.png') no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  overflow: hidden;
}
.form-bg {
  background: url('../../assets/loginImg/bg_denglu.png') no-repeat;
  height: 85vh;
  width: 80%;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -40%;
  display: table;
}
.img-left-bg {
  width: 50%;
}
.img-right-bg {
  position: absolute;
  right: 0;
  bottom: 0;
}
.form-body {
  display: table-cell;
  vertical-align: middle;
}
.title {
  text-align: center;
}
.login-img {
  width: 100%;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
