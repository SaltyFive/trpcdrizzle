import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '~~/server/trpc/routers'
import superjson from 'superjson';

export default defineNuxtPlugin(() => {
    const trpcClient = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
        url: '/api/trpc',
        maxURLLength: 4000,
        transformer: superjson,
        }),
    ],
    })

    return {
    provide: {
        trpcClient,
    },
    }
})