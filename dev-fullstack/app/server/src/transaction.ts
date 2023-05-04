import {
  Field,
  ObjectType,
} from 'type-graphql';

@ObjectType()
export class Transaction {
  @Field()
  id: string;
}