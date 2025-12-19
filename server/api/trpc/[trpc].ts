import { createTRPCNuxtHandler } from 'trpc-nuxt/server'
import { createContext } from '../../trpc/context';
import { appRouter } from '../../trpc/routers'

export default createTRPCNuxtHandler({
    router: appRouter,
    createContext,
})