<template>
  <div class="border-solid border-8 border-amber-300 rounded-2xl max-w-md mx-auto my-8 p-8 shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
    <!-- 表单标题 -->
    <h2 class="text-2xl font-bold text-amber-600 mb-6 text-center">用户注册</h2>
    
    <!-- 用户名输入框 -->
    <div class="mb-4">
      <input 
        v-model="registerUser.username" 
        placeholder="请输入用户名"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
        type="text"
      />
    </div>
    
    <!-- 密码输入框 -->
    <div class="mb-6">
      <input 
        v-model="registerUser.password" 
        placeholder="请输入密码"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
        type="password"
      />
    </div>
    
    <!-- 注册按钮 -->
    <button 
      v-if="!registerIsPending" 
      @click="registerMutation(registerUser)"
      class="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
    >
      注册
    </button>
    <button 
      v-else
      class="w-full bg-gray-400 text-white font-medium py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
      disabled
    >
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      等待中
    </button>
  </div>

  <div class="border-solid border-8 border-amber-300 rounded-2xl max-w-md mx-auto my-8 p-8 shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
    <!-- 表单标题 -->
    <h2 class="text-2xl font-bold text-amber-600 mb-6 text-center">用户登录</h2>
    
    <!-- 用户名输入框 -->
    <div class="mb-4">
      <input 
        v-model="loginUser.username" 
        placeholder="请输入用户名"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
        type="text"
      />
    </div>
    
    <!-- 密码输入框 -->
    <div class="mb-6">
      <input 
        v-model="loginUser.password" 
        placeholder="请输入密码"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
        type="password"
      />
    </div>
    
    <!-- 登录按钮 -->
    <button 
      v-if="!loginIsPending" 
      @click="loginMutation(loginUser)"
      class="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
    >
      登录
    </button>
    <button 
      v-else
      class="w-full bg-gray-400 text-white font-medium py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
      disabled
    >
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      等待中
    </button>
  </div>

  <div v-for="user in usersList":key=user.id
    class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 ">
    <div>{{ user.id }}</div>
    <div>{{ user.username }}</div>
  </div>
  <button @click="console.log(usersList)" class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">所有用户打印</button>
  
</template>

<script setup lang="ts">
  const queryClient = useQueryClient()
  import { useQuery,useMutation, useQueryClient } from '@tanstack/vue-query'
  const { $trpc } = useNuxtApp()
  const registerUser = reactive({
    username:'',
    password:''
  })
  const loginUser = reactive({
    username:'',
    password:''
  })

  const { mutate:registerMutation,isPending:registerIsPending } = useMutation({
    mutationFn:async (user:{username:string,password:string}) => {
      const result = await $trpc.auth.register.mutate(user)
      console.log(result)
      return result
    },
    onSuccess:() => {
      console.log('成功发送请求至后端')
      queryClient.invalidateQueries({queryKey:['users']})
    },
    onError:err => console.log('Error:',err)
  })

  const { mutate:loginMutation,isPending:loginIsPending } = useMutation({
    mutationFn:async (user:{username:string,password:string}) => {
      const result = await $trpc.auth.login.mutate(user)
      console.log(result)
      return result
    },
    onSuccess:() => {
      console.log('成功发送请求至后端')
      queryClient.invalidateQueries({queryKey:['users']})
    },
    onError:err => console.log('Error:',err)
  })

  const { data:usersList,suspense:userQuerySuspense} = useQuery({
    queryKey:['users','list'],
    queryFn:() => $trpc.auth.getAll.query()
  })
  
  await userQuerySuspense()
  
</script>