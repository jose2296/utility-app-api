import { users } from '@prisma/client';
import { db } from "../db";

export const getAllUsers = async () => {
    return await db.users.findMany({ include: { categories: true, tasks: true } });
}

export const finUserByColumn = async (column: keyof users, value: users[keyof users]) => {
    return await db.users.findFirst({
        where: {
            [column]: value
        },
        include: {
            categories: true,
            tasks: true
        }
    });
};

export const createUser = async (data: users) => {
    return await db.users.create({ data });
};