// app/plugins/client.ts
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '~~/server/trpc/routers'
import superjson from 'superjson';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueQueryPlugin)
    const trpcClient = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
        url: '/api/trpc',
        maxURLLength: 4000,
        transformer: superjson,
        }),
    ],
    })

    const queryClient = new QueryClient({
        defaultOptions:{
            queries:{
                retry:2,
                refetchOnWindowFocus:false
            }
        }
    })

    return {
    provide: {
        trpc:trpcClient,
    },
    }
})

// import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
// import { defineNuxtPlugin } from 'nuxt/app'
// import type { NuxtApp } from 'nuxt/app'

// export default defineNuxtPlugin((nuxtApp) => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: 2,
//         refetchOnWindowFocus: false
//       }
//     }
//   })

//   nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
// })