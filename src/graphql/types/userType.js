import {
  getGraphQLFieldsFromTable,
  fieldFromConnectionType,
} from 'nothinkdb-graphql';
import {
  GraphQLObjectType,
} from 'graphql';
import {
  connectionDefinitions,
} from 'graphql-relay';
import r from 'rethinkdb';
import { pool } from '../../helpers/connection';
import userTable from '../../tables/userTable';
import {
  nodeInterface,
  registerType,
} from '../nodeDefinitions';

export const userFields = getGraphQLFieldsFromTable(userTable);

const userType = new GraphQLObjectType({
  name: 'Foo',
  interfaces: [nodeInterface],
  fields: () => ({
    ...userFields,
    following: fieldFromConnectionType({
      connectionType: userConnectionType,
      table: userTable,
      graphQLType: userType,
      getQuery: user => userTable
        .queryRelated(user.id, 'following')
        .orderBy(r.desc('createdAt')),
      runQuery: query => pool.run(query),
    }),
    followers: fieldFromConnectionType({
      connectionType: userConnectionType,
      table: userTable,
      graphQLType: userType,
      getQuery: user => userTable
        .queryRelated(user.id, 'followers')
        .orderBy(r.desc('createdAt')),
      runQuery: query => pool.run(query),
    }),
  }),
});

registerType({
  table: userTable,
  type: userType,
});

export const {
  connectionType: userConnectionType,
  edgeType: userEdgeType,
} = connectionDefinitions({ nodeType: userType });

export const userConnectionField = fieldFromConnectionType({
  connectionType: userConnectionType,
  table: userTable,
  graphQLType: userType,
  getQuery: () => userTable.query().orderBy({ index: r.desc('createdAt') }),
  runQuery: query => pool.run(query),
});

export default userType;
