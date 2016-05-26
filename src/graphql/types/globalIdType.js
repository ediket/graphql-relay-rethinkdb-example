import {
  GraphQLScalarType,
} from 'graphql';
import { Kind } from 'graphql/language';
import { fromGlobalId } from 'graphql-relay';
import _ from 'lodash';
import invariant from '../../helpers/invariant';

function coreceType(value) {
  const { id } = fromGlobalId(value);
  invariant(id, `Query error: invalid globalId type: ${[value]}`);
  return id;
}

// refer: https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js
export default new GraphQLScalarType({
  name: 'GlobalIdType',
  serialize: () => null,  // GlobalIdType is only InputType
  parseValue: value => {
    if (_.isString(value)) {
      return coreceType(value);
    }
    return null;
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      return coreceType(ast.value);
    }
    return null;
  },
});
