import pgPromise from "pg-promise";
import envVars from '@shared/env-vars';

const pgp = pgPromise();

const connection = {
  host: envVars.database.host,
  port: envVars.database.port,
  database: 'manga_app',
  user: envVars.database.user,
  password: envVars.database.password,
  max: 30,
};

const db = pgp(connection);

export default db;
