import { drizzle } from 'drizzle-orm/libsql'
import { env } from '../env';
import { createClient } from '@libsql/client'
import * as schema from './schema'

const client = createClient({ url: env.DB_FILE_NAME });
export const db = drizzle(client, { schema })