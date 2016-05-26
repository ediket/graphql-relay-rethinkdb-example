import { GraphQLError } from 'graphql';

export default function invariant(value, message) {
  if (!value) {
    throw new GraphQLError(message);
  }
}
