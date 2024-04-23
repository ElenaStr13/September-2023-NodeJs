import express, { Request, Response } from "express";
import {reader, writer} from './fs.service';

import { IUser } from "./user.interface";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) => {
    res.send("Hello")
})
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await reader();
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message)
    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;

        const users = await reader();

        const newUser: IUser = {id: users[users.length - 1].id + 1, name, email, password}
        users.push(newUser);
        await writer(users);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.get('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const users = await reader();

        const user = users.find((user) => user.id === userId);
        if (!user) {
            throw new Error('user not found');
        }
        res.json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.put('/users/:userId', async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;
        const userId = Number(req.params.userId);
        const users = await reader();

        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new Error('user not found');
        }
        users[index] = {...users[index], name, email, password}
        await writer(users);

        res.status(201).json(users[index]);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.delete('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const users = await reader();

        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new Error('user not found');
        }
        users.splice(index, 1);
        await writer(users);
        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
            console.log(`Server is running at http://127.0.0.1:${PORT}/users`);
        })



