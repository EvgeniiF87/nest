import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class RefreshTokenResponse {
  @Field()
  token: string;
}
