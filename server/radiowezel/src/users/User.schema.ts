import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
