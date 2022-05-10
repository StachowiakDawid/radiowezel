import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { Document } from 'mongoose';

//export type CatDocument = Cat & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
