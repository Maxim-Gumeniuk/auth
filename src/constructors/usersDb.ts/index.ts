import mongoose from "mongoose";
export class Db {
    connectionString: string;
    schema: any
    constructor(connectionString: string, schema: any) {
        this.connectionString = connectionString;
        this.schema = schema;
    }
    async connect() {
        const { connectionString } = this;
        await mongoose.connect(connectionString);
    }

    createSchema() {
        const { schema } = this;
        return new mongoose.Schema(schema);
    }

    createModel(dbName: string) {
        const { schema } = this;
        return mongoose.model(dbName, schema);
    }
}
