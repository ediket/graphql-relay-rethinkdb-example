import r from 'rethinkdb';
import env from './env';
import userTable from './userTable';

const followingTable = env.createTable({
  tableName: 'UserFollow',
  schema: () => ({
    followerId: userTable.getForeignKey({ isManyToMany: true }),
    followeeId: userTable.getForeignKey({ isManyToMany: true }),
  }),
  index: {
    following: [r.row('followerId'), r.row('followeeId')],
    followers: [r.row('followeeId'), r.row('followerId')],
  },
});

export default followingTable;
