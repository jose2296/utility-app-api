import { TokenPayload } from "@/services/auth";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { Request } from "../types";

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return response.sendStatus(401);

    try {
        const payload = verify(token!, process.env.JWT_SECRET!) as TokenPayload;
        request.user = payload;
        next();
    } catch (error) {
        return response.sendStatus(401);
    }
}