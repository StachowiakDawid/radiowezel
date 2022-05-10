import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersService } from './users/users.service';
import { SongsService } from './songs/songs.service';
import { SongsResolver } from './songs/songs.resolver';
import { Song, SongSchema } from './songs/Song.schema';
import { User, UserSchema } from './users/User.schema';
import { UsersResolver } from './users/users.resolver';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema },
      { name: User.name, schema: UserSchema },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    SongsService,
    SongsResolver,
    UsersResolver,
  ],
})
export class AppModule {}
