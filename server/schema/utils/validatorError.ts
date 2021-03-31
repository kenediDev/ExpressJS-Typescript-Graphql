import { GraphQLError } from 'graphql';

export class ValidatorError extends GraphQLError {
  validator(options) {
    return new Error(options);
  }
}
