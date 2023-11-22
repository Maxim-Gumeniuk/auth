import express from "express";
import swaggerUi from 'swagger-ui-express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import swaggerJson from '@/swagger/swagger.json';

import { authRouter } from "./routes/auth/auth-router";
import { connectUsersDb } from "./db/users";
import { mainRouter } from "./routes/main";
import { errorMiddleware } from "./middlewares/error";
import { ENVVARIABLES } from "./env-variables";
import { DOCS } from "./types/routes/docs";

const app = express();

const { PORT, CLIENT_APP_URL } = ENVVARIABLES;

app.use(cors({
    origin: CLIENT_APP_URL,
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(mainRouter);

app.use(DOCS.API_DOCS, 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerJson)
    );

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
