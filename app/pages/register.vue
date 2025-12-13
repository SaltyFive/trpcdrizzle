<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        创建新账户
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <div class="mt-1">
              <input
                id="username"
                v-model="registerData.username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': registerError }"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="registerData.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': registerError }"
              />
            </div>
            <p class="mt-2 text-sm text-gray-500">至少6个字符</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="registerData.confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': registerError }"
              />
            </div>
          </div>

          <div v-if="registerError" class="text-red-600 text-sm">
            {{ registerError }}
          </div>

          <div class="flex space-x-4">
            <button
              type="button"
              @click="goToLogin"
              class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              返回登录
            </button>
            
            <button
              type="submit"
              :disabled="isLoading"
              class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <span v-if="isLoading">注册中...</span>
              <span v-else>注册</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

const router = useRouter()
const { $trpcClient } = useNuxtApp()

const registerData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const registerError = ref('')
const isLoading = ref(false)

const goToLogin = () => {
  router.push('/')
}

const handleRegister = async () => {
  // 验证密码匹配
  if (registerData.value.password !== registerData.value.confirmPassword) {
    registerError.value = '两次输入的密码不匹配'
    return
  }
  
  // 验证密码长度
  if (registerData.value.password.length < 6) {
    registerError.value = '密码至少需要6个字符'
    return
  }
  
  try {
    isLoading.value = true
    registerError.value = ''
    
    const result = await $trpcClient.auth.register.mutate({
      username: registerData.value.username,
      password: registerData.value.password
    })
    
    if (result.success) {
      // 注册成功，跳转到登录页面
      await router.push('/')
    }
  } catch (error: any) {
    registerError.value = error.message || '注册失败'
  } finally {
    isLoading.value = false
  }
}
</script>