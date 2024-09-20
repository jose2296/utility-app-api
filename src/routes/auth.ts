import { login, LoginCredentials, register } from "@/services/auth";
import { users } from "@prisma/client";
import express, { Response } from "express";
import { Request } from "../types";

const authRouter = express.Router()

authRouter.post("/login", async (request: Request<LoginCredentials>, response: Response) => {
    const token = await login(request.body);

    if (!token) {
        return response.status(401).send({ error: 'wrong credentials' });
    }

    response.status(200).send({ token });
});

authRouter.post("/register", async (request: Request<users>, response: Response) => {
    const newUser = await register(request.body);

    if (!newUser) {
        response.sendStatus(422);
    }

    response.status(201).send(newUser);
});

export default authRouter;