import express, { NextFunction, Request, Response } from "express";
import { reader, writer } from "./fs.service";
import {ApiError} from "./api-error";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Hello")
})
app.get('/users', async (req:Request, res:Response) => {
    try {
        const users = await reader();
        res.json(users);
    } catch (e:any) {
        res.status(400).json(e.message)
    }
});

app.post('/users', async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;

        const users = await reader();

        const newUser = {id: users[users.length - 1].id + 1, name, email, password}
        users.push(newUser);
        await writer(users);
        res.status(201).json(newUser);
    } catch (e:any) {
        res.status(400).json(e.message)
    }
})

app.get('/users/:userId', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const users = await reader();

        const user = users.find((user) => user.id === userId);
        if (!user) {
            throw new ApiError('user not found', 404);
        }
        res.json(user);
    } catch (e) {
        next(e)
    }
})

app.put('/users/:userId', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body;
        const userId = Number(req.params.userId);
        const users = await reader();

        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new ApiError('user not found', 404);
        }
        users[index] = {...users[index], name, email, password}
        await writer(users);

        res.status(201).json(users[index]);
    } catch (e:any) {
        next(e)
    }
})

app.delete('/users/:userId', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const users = await reader();

        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new ApiError('user not found', 404);
        }
        users.splice(index, 1);
        await writer(users);
        res.sendStatus(204);
    } catch (e:any) {
        next(e)
    }
})

app.use("*", (err: ApiError, req:Request, res:Response, next: NextFunction) => {
    return res.status(err.status || 500).json(err.message)
}
);

process.on("uncaughtException", (error) => {
    console.error("uncaughtException: ", error);
    process.exit(1);
});

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
            console.log(`Server is running at http://127.0.0.1:${PORT}/users`);
        })



