import { TRPCError } from '@trpc/server'
import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function registerUser(username:string,password:string) {
  const exist = await db.query.users.findFirst({
    where:eq(users.username,username)
  })
  if (exist) { throw new Error("用户已存在") }

  const hashedPassword = await bcrypt.hash(password, 10) //密码加密，无需在意

  const newUser = await db.insert(users).values({
    username: username,
    password: hashedPassword
  }).returning().get()

  return {
    success: true,
    message: '注册成功',
    user: {
      id: newUser.id,
      username: newUser.username
    }
  }
}

export async function loginUser(username:string,password:string) {
  const user = await db.query.users.findFirst({
    where:eq(users.username,username)
  })
  if (!user) { throw new Error('用户不存在') }

  // 验证密码
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) { throw new Error('密码错误') }
  // 箭头函数返回值，类型由推断得出
  return {
    success: true,
    message: '登录成功',
    user: {
      id: user.id,
      username: user.username
    }
  }
}