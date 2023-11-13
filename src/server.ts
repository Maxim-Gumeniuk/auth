import express from "express";
import cors from "cors";

import { ENVVARIABLES } from "@/env-variables";
import { authRouter } from "./routes/auth-router";
import { connectUsersDb } from "./db/users";
import { newBot } from "./services/telegram";

const app = express();

const { PORT, CLIENT_APP_URL } = ENVVARIABLES;

app.use(cors({
    origin: CLIENT_APP_URL,
    credentials: true,
}))

app.use(express.json());
app.use(authRouter);

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => {

        console.log(`Server started on ${PORT}`); 
    });

    await connectUsersDb()
    await newBot()

    ///"I understand that I should use Promise.all here. 
    //However, is it necessary? 
    //If I have trouble with the bot, my database won't connect."

    } catch (error) {
        console.error(error);
    }
};

void start();
