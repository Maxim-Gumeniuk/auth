import { Db } from "@/constructors/usersDb.ts";
import { ENVVARIABLES } from "@/env-variables";

const { MONGOSTRING } = ENVVARIABLES

export const usersDb = new Db(MONGOSTRING!);

export const connectUsersDb = async () => {
    try {
        await usersDb.connect();

        console.log("Connected to the database");

    } catch (e) {
        console.log(e);
    }
}