import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient({
    omit: {
        users: {
            password: true
        }
    }
})