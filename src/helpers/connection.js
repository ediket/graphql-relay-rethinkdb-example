import r from 'rethinkdb';
import Pool from 'rethinkdb-pool';
import { promisifyAll } from 'bluebird';
import { RETHINKDB } from '../config';

export function getConnection(options = {}) {
  return r.connect({
    db: RETHINKDB.DB,
    host: RETHINKDB.HOST,
    port: RETHINKDB.PORT,
    authKey: RETHINKDB.AUTHKEY,
    timeout: RETHINKDB.TIMEOUT,
    ...options,
  });
}

export const pool = promisifyAll(
  new Pool(r, {
    db: RETHINKDB.DB,
    host: RETHINKDB.HOST,
    port: RETHINKDB.PORT,
    authKey: RETHINKDB.AUTHKEY,
    timeout: RETHINKDB.TIMEOUT,
  })
);
