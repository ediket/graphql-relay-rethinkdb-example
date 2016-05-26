import r from 'rethinkdb';
import { RETHINKDB } from '../src/config';
import { getConnection } from '../src/helpers/connection';
import env from '../src/tables/env';
import '../src/tables/userTable';
import '../src/tables/userFollowTable';

async function syncDB() {
  const connection = await getConnection({ db: null });
  r.branch(
    r.dbList().contains(RETHINKDB.DB).not(),
    r.dbCreate(RETHINKDB.DB),
    null
  ).run(connection);
  await connection.close();
}

async function syncTables() {
  const connection = await getConnection();
  await env.sync(connection);
  await connection.close();
}

syncDB()
.then(() => syncTables())
.catch(e => {
  console.log(e.stack);
})
.then(() => process.exit());
