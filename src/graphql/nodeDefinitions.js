import {
  nodeDefinitions,
} from 'nothinkdb-graphql';
import { pool } from '../helpers/connection';

export const {
  nodeField,
  nodeInterface,
  registerType,
} = nodeDefinitions({
  runQuery: query => pool.run(query),
});
