import express from 'express';
import { ENVVARIABLES } from '@/env-variables';

const app = express();

const { PORT } = ENVVARIABLES;

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => {
            console.log('Server started');
        });
    } catch (error) {
        console.error(error);
    }
};

void start();
