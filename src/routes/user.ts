import { getAllUsers } from "@/repositories/useRepository";
import { Request } from "@/types";
import express, { Response } from "express";

const userRouter = express.Router()

userRouter.get("/", async (request: Request, response: Response) => {
    const users = await getAllUsers();

    response.status(200).send(users);
});

// userRouter.post("/", async (request: Request<users>, response: Response) => {
//     const newUser = await createUser(request.body);
//     // const newUser = await db.insert(userModel).values({
//     //     email: 'Test 1'
//     // });

//     console.log(newUser);

//     response.status(201).send(newUser);
// });

export default userRouter;