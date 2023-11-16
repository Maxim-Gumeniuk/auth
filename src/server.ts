import express from "express";
import cors from "cors";

import { ENVVARIABLES } from "@/env-variables";
import { authRouter } from "./routes/auth/auth-router";
import { connectUsersDb } from "./db/users";
import { mainRouter } from "./routes/main/main-router";

const app = express();

const { PORT, CLIENT_APP_URL } = ENVVARIABLES;

app.use(cors({
    origin: CLIENT_APP_URL,
    credentials: true,
}))

app.use(express.json());
app.use(authRouter);
app.use(mainRouter);

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => {

        console.log(`Server started on ${PORT}`); 
    });

    connectUsersDb()

    } catch (error) {
        console.error(error);
    }
};

void start();
