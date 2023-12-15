import mongoose from "mongoose";
import { usersDb } from "./connection";

const refreshTokenSchema = usersDb.createSchema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    refreshToken: String,
});

export const RefreshToken = usersDb.createModel('refreshToken', refreshTokenSchema);
