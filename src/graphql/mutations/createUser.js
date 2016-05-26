import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import userTable from '../../tables/userTable';
import userType from '../types/userType';
import { pool } from '../../helpers/connection';

export default mutationWithClientMutationId({
  name: 'CreateUser',
  outputFields: {
    user: { type: userType },
  },
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  async mutateAndGetPayload(args) {
    const { name } = args;

    const user = userTable.create({ name });
    await pool.run(userTable.insert(user));

    return { user };
  },
});
