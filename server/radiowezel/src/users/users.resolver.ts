import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { User as UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { User } from './user.model';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Mutation(() => User)
  async addUser(
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<UserSchema> {
    return this.usersService.add(id);
  }
}
