import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface Vote {
  userId: string;
  type: string;
}

@Schema()
export class Song {
  @Prop({ unique: true })
  videoId: string;
  @Prop()
  title: string;
  @Prop()
  votes: [Vote];
}

export const SongSchema = SchemaFactory.createForClass(Song);
