import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Song } from 'src/songs/Song.model';
import { SongsService } from './songs.service';
import { YT_API_KEY } from '../../constants';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Resolver()
export class SongsResolver {
  constructor(
    private songsService: SongsService,
    private httpService: HttpService,
  ) {}
  @Query(() => [Song])
  async songs(
    @Args({ name: 'userId', type: () => String }) userId: string,
  ): Promise<Song[]> {
    const songsWithVotes: Song[] = [];
    (await this.songsService.getAll()).forEach(async (song) => {
      const userAction = song.votes.find((el) => el.userId === userId);
      const upvotes = song.votes.filter((el) => el.type === 'upvote').length;
      songsWithVotes.push({
        title: song.title,
        videoId: song.videoId,
        upvotes: upvotes,
        downvotes: song.votes.length - upvotes,
        userAction: userAction ? userAction.type : 'none',
      });
    });
    return songsWithVotes;
  }
  @Mutation(() => String)
  async addVote(
    @Args('userId', {
      type: () => String,
    })
    userId: string,
    @Args('videoId', {
      type: () => String,
    })
    videoId: string,
    @Args('type', {
      type: () => String,
    })
    type: string,
  ): Promise<string> {
    this.songsService.addVote(userId, videoId, type);
    return 'Voted';
  }
  @Mutation(() => String)
  async resignVote(
    @Args('userId', {
      type: () => String,
    })
    userId: string,
    @Args('videoId', {
      type: () => String,
    })
    videoId: string,
  ): Promise<string> {
    this.songsService.resignVote(userId, videoId);
    return 'Resigned';
  }
  @Mutation(() => String)
  async addSong(
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<string> {
    const url = 'https://www.googleapis.com/youtube/v3/videos';
    const params = new URLSearchParams();
    params.append('key', YT_API_KEY);
    params.append('part', 'snippet');
    params.append('id', id);
    let returnMessage = '';
    const result = await lastValueFrom(
      this.httpService.get(url, {
        params: params,
      }),
    );
    if (result.data.items[0]) {
      await this.songsService
        .add(id, result.data.items[0].snippet.title)
        .then((response) => {
          returnMessage = !response ? 'The song is already added' : 'Added';
        });
    } else {
      returnMessage = "The video doesn't exist or is unavailable";
    }
    return returnMessage;
  }
}
