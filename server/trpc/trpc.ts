// server/trpc/trpc.ts
// 初始化trpc,导出可以复用的函数
import { initTRPC } from '@trpc/server';
import type { Context } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create({
  transformer: superjson,

// 在tRPC中，errorShape是create方法的一个可选配置选项，用于自定义错误对象的结构，确保错误信息在客户端和服务器之间传输时的一致性。‌‌
// errorShape的配置方式：它是一个函数，接收一个包含shape（当前错误形状）和error（原始错误）的对象作为参数，并返回格式化后的错误对象。
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;