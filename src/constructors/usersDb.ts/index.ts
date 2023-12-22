import mongoose from "mongoose";
export class Db {
    private _connectionString: string;
    private static instance: Db;

    constructor(connectionString: string) {
        this._connectionString = connectionString;

        if (Db.instance) {
            return Db.instance;
        }

        Db.instance = this;
    }

    async connect() {
        const { _connectionString } = this;
        await mongoose.connect(_connectionString);
    }

    createSchema(schema: any) {
        return new mongoose.Schema(schema);
    }

    createModel(dbName: string, schema: any) {
        return mongoose.model(dbName, schema);
    }
}
