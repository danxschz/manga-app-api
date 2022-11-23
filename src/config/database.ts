import pgPromise from "pg-promise";

const pgp = pgPromise();

const connection = 'postgres://username:password@host:port/database';
const db = pgp(connection);