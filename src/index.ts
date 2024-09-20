import * as dotenv from 'dotenv';
import express, { Response } from "express";
import { authenticateToken } from './middlewares/auth';
import { finUserByColumn } from './repositories/useRepository';
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import { Request } from "./types";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

const apiRouter = express.Router();

apiRouter.get("/", async (_: Request, response: Response) => {
    response.status(200).send("Welcome to utility-app api!");
});

app.use('/api', apiRouter);

apiRouter.get("/me", authenticateToken, async (request: Request, response: Response) => {
    const user = await finUserByColumn('id', request.user?.id!)
    console.log(user);

    response.status(200).send(user);
});
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

app.get("*", (_: Request, response: Response) => {
    response.status(404).send(404);
});

app.use((req, res, next) => {

    res.status(401).send({ error: 'err' })
})

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});