import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from 'src/songs/Song.schema';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async getAll(): Promise<Array<Song>> {
    return this.songModel.find().exec();
  }
  async checkIfExists(id: string): Promise<Song | null> {
    return this.songModel.findOne({ videoId: id });
  }
  async add(videoId: string, title: string): Promise<Song | null> {
    if (!(await this.checkIfExists(videoId))) {
      return await new this.songModel({
        videoId: videoId,
        title: title,
        votes: [],
      }).save();
    }
    return null;
  }
  async addVote(userId: string, videoId: string, type: string): Promise<Song> {
    const song = await this.songModel.findOne({ videoId: videoId });
    const votes = [...song.votes];
    const currentVote = votes.find((el) => el.userId === userId);
    if (currentVote) {
      currentVote.type = type;
    } else {
      votes.push({ userId: userId, type: type });
    }
    return await this.songModel.findOneAndUpdate(
      { videoId: videoId },
      { votes: votes },
    );
  }
  async resignVote(userId: string, videoId: string): Promise<Song> {
    const song = await this.songModel.findOne({ videoId: videoId });
    const votes = [...song.votes];
    const currentVote = votes.findIndex((el) => el.userId === userId);
    if (currentVote > -1) {
      votes.splice(currentVote, 1);
    }
    return await this.songModel.findOneAndUpdate(
      { videoId: videoId },
      { votes: votes },
    );
  }
}
