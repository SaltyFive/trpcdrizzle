// 初始化trpc,导出可以复用的函数
import { initTRPC } from '@trpc/server';
import type { Context } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create({
  transformer: superjson,

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