import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Song {
  @Field(() => String)
  videoId: string;

  @Field(() => Int)
  upvotes: number;

  @Field(() => Int)
  downvotes: number;

  @Field(() => String)
  userAction: string;

  @Field(() => String)
  title: string;
}
