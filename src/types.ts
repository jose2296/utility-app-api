import { Request as ExpressRequest } from "express";
import { TokenPayload } from "./services/auth";

export interface Request<T = any> extends ExpressRequest {
    user?: TokenPayload;
    body: T;
}