import Joi from 'joi';
import { belongsToMany } from 'nothinkdb';
import env from './env';
import userFollowTable from './userFollowTable';

const userTable = env.createTable({
  tableName: 'Foo',
  schema: () => ({
    name: Joi.string(),
  }),
  relations: () => ({
    following: belongsToMany([
      userTable.linkedBy(userFollowTable, 'followerId'),
      userFollowTable.linkTo(userTable, 'followeeId'),
    ], { index: 'following' }),
    followers: belongsToMany([
      userTable.linkedBy(userFollowTable, 'followeeId'),
      userFollowTable.linkTo(userTable, 'followerId'),
    ], { index: 'followers' }),
  }),
});

export default userTable;
