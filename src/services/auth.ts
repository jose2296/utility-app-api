import { db } from "@/db";
import { createUser, finUserByColumn } from "@/repositories/useRepository";
import { users } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export type TokenPayload = Pick<users, 'id' | 'email'>;
export type LoginCredentials = Pick<users, 'email' | 'password'>;

export const login = async (credencials: LoginCredentials) => {
    const user = await db.users.findFirst({
        where: {
            email: credencials.email
        },
        select: {
            id: true,
            email: true,
            password: true
        }
    });

    if (!user) {
        return null
    }

    const passwordMatch = await compare(credencials.password, user.password);

    if (!passwordMatch) {
        return null;
    }

    return generateToken({ id: user.id, email: user.email });
}

export const register = async (user: users) => {
    const userExists = await finUserByColumn('email', user.email);

    if (!!userExists) {
        return null;
    }

    const hashedPassword = await hash(user.password, Number(process.env.SALT_ROUNDS) || 10);
    const newUser = createUser({ ...user, password: hashedPassword });

    return newUser;
}

export const generateToken = (payload: TokenPayload) => {
    return sign(payload, process.env.JWT_SECRET!, { expiresIn: '1800s' });
}