<template>
  <div class="login">
    <div class="login-box">
      <el-form ref="ruleFormRef" :model="loginForm" :rules="rules">
        <h3 class="title">RBAC 系统</h3>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="请输入账户..." size="default" type="text"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :prefix-icon="Lock" placeholder="请输入账户..." show-password size="default"
                    type="password"/>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="loginForm.verifyCode" :prefix-icon="Key" placeholder="验证码" size="default" type="text"/>
            </el-col>
            <el-col :span="8">
              <el-image :src="imageUrl" @click="getVerifyHandler"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" label="记住我" size="default"/>
        </el-form-item>
        <el-form-item>
          <el-button size="default" type="primary" @click.stop="loginHandler(ruleFormRef)">
            <span v-if="loginText">登 录</span>
            <span v-else>登 录 中 ...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">
      <span>© 2022 He Tong Xue&nbsp;
        <el-link :underline="false" href="#">Apache License 2.0</el-link>
        &nbsp;⋅&nbsp;
        <el-link :underline="false" href="#">渝ICP备18089431号-8</el-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {Key, Lock, User} from "@element-plus/icons-vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {loginVo} from "../api/auth/types";
import {getVerify, login} from "../api/auth/auth";
import {useRouter} from "vue-router";
import {Base64} from 'js-base64'

const router = useRouter()
const loginText = ref<Boolean>(true)
const imageUrl = ref<string>('')
const ruleFormRef = ref<FormInstance>()
const loginForm = reactive<loginVo>({
  username: '',
  password: '',
  verifyCode: '',
  rememberMe: false
})
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '账号不能为空', trigger: 'blur'},
    {min: 3, max: 20, message: '账号长度为3到20', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 3, max: 20, message: '密码长度为3到20', trigger: 'blur'}
  ],
  verifyCode: [
    {required: true, message: '验证码不能为空', trigger: 'blur'}
  ]
})
const getVerifyHandler = async () => {
  const {data} = await getVerify()
  imageUrl.value = data.data
}
const loginHandler = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const {data} = await login(loginForm);
      switch (data.code as number) {
        case 200: {
          ElMessage.success('登陆成功')
          await router.push('/dashboard')
          break
        }
        case 5000: {
          ElMessage.error('验证码错误')
          loginForm.verifyCode = ''
          await getVerifyHandler()
          break
        }
        case 400: {
          ElMessage.error('用户名或密码错误')
          loginForm.verifyCode = ''
          loginForm.password = ''
          break
        }
      }
    }
  })
}

onMounted(() => getVerifyHandler())
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: darkseagreen;


  &-box {
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    width: 380px;
    height: 320px;
    background-color: white;

    .title {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18.5px;
      color: #707070;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    }

    :deep(.el-row) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :deep(.el-image) {
      cursor: pointer;
      width: 100%;
      height: 100%;
    }

    :deep(.el-button) {
      width: 100%;
    }
  }

  &-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.el-link), span {
      font-size: 12px;
      color: white;
      font-family: Arial, serif;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>