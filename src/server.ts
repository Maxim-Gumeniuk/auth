import express from "express";
import cors from "cors";

import { ENVVARIABLES } from "@/env-variables";
import { authRouter } from "./routes/auth/auth-router";
import { connectUsersDb } from "./db/users";
<<<<<<< HEAD
import { mainRouter } from "./routes/main";
import { errorMiddleware } from "./middlewares/error";
=======
import { mainRouter } from "./routes/main/main-router";
>>>>>>> 33f38992519f5335762f31522a3d7733b62fe0ea

const app = express();

const { PORT, CLIENT_APP_URL } = ENVVARIABLES;

app.use(cors({
    origin: CLIENT_APP_URL,
    credentials: true,
}))

app.use(express.json());
app.use(authRouter);
app.use(mainRouter);
<<<<<<< HEAD
app.use(errorMiddleware)
=======
>>>>>>> 33f38992519f5335762f31522a3d7733b62fe0ea

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
