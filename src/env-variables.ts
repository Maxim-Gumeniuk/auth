import "dotenv/config";

const { PORT,  MONGODB, CLIENT_APP_URL } = process.env;

export const ENVVARIABLES = {
  PORT: PORT,
  MONGOSTRING: MONGODB,
  CLIENT_APP_URL: CLIENT_APP_URL,
};
