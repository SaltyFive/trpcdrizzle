<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">欢迎页面</h1>
          </div>
          <div class="flex items-center">
            <span class="text-gray-700 mr-4">欢迎，{{ user?.username }}</span>
            <button
              @click="handleLogout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">登录成功！</h2>
            <p class="text-gray-600">您已成功登录到系统。</p>
            <div class="mt-6 p-4 bg-primary-50 rounded-md">
              <h3 class="text-lg font-medium text-primary-900">用户信息</h3>
              <div class="mt-2 space-y-2">
                <p class="text-primary-700">用户ID: {{ user?.id }}</p>
                <p class="text-primary-700">用户名: {{ user?.username }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from '#app'

const router = useRouter()

const user = ref<{ id: number; username: string } | null>(null)

// 在实际应用中，这里应该从localStorage、cookie或session获取用户信息
// 为简化示例，我们从URL参数获取
onMounted(() => {
  // 模拟从localStorage获取用户信息
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  } else {
    // 如果没有用户信息，重定向到登录页
    router.push('/')
  }
})

const handleLogout = () => {
  // 清除用户信息
  localStorage.removeItem('user')
  // 重定向到登录页
  router.push('/')
}
</script>