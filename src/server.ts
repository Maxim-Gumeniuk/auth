import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { ENVVARIABLES } from "@/env-variables";
import { authRouter } from "./routes/auth/auth-router";
import { connectUsersDb } from "./db/users";
import { mainRouter } from "./routes/main";
import { errorMiddleware } from "./middlewares/error";
import { swagerDocs } from "./swagger";
import { Docs } from "./types/routes/docs";

const app = express();

const { PORT, CLIENT_APP_URL } = ENVVARIABLES;

app.use(cors({
    origin: CLIENT_APP_URL,
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser())

app.use(authRouter);
app.use(mainRouter);

app.use(Docs.API_DOCS,swaggerUi.serve, swaggerUi.setup(swagerDocs));

app.use(errorMiddleware);

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => {

        console.log(`Server started on ${PORT}`); 
    });

    await connectUsersDb()

    } catch (error) {
        console.error(error);
    }
};

void start();
