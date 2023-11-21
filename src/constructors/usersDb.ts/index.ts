import mongoose from "mongoose";
export class Db {
    connectionString: string;
    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }
    async connect() {
        const { connectionString } = this;
        await mongoose.connect(connectionString);
    }

    createSchema(schema: any) {
        return new mongoose.Schema(schema);
    }

    createModel(dbName: string, schema: any) {
        return mongoose.model(dbName, schema);
    }
}
