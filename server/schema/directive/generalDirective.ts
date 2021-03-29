import { SchemaDirectiveVisitor } from '@graphql-tools/utils';
import { GraphQLEnumValue, GraphQLField } from 'graphql';

class GeneralDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    field.isDeprecated = true;
    field.deprecationReason = this.args.reason;
  }

  public visitEnumValue(value: GraphQLEnumValue) {
    value.isDeprecated = true;
    value.deprecationReason = this.args.reason;
  }
}

export default GeneralDirective;
