<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        登录您的账户
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
                用户名
            </label>
            <div class="mt-1">
                <input
                id="username"
                v-model="loginData.username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': loginError }"
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
                v-model="loginData.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-300': loginError }"
                />
            </div>
            </div>

            <div v-if="loginError" class="text-red-600 text-sm">
            {{ loginError }}
            </div>

            <div>
            <button
                type="submit"
                :disabled="isLoading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
                <span v-if="isLoading">登录中...</span>
                <span v-else>登录</span>
            </button>
            </div>
        </form>

        <div class="mt-6">
            <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">还没有账户？</span>
            </div>
            </div>

            <div class="mt-6">
            <button
                @click="navigateTo('/register')"
                class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
                注册新账户
            </button>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

const router = useRouter()
const { $trpcClient } = useNuxtApp()

const loginData = ref({
    username: '',
    password: ''
})

const loginError = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
    try {
    isLoading.value = true
    loginError.value = ''
    
    const result = await $trpcClient.auth.login.mutate(loginData.value)
    
    if (result.success) {
      // 登录成功，跳转到主页
        await router.push('/home')
    }
    } catch (error: any) {
    loginError.value = error.message || '登录失败'
    } finally {
    isLoading.value = false
    }
}
</script>