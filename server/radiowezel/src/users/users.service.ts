import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll(): Promise<Array<User>> {
    return this.userModel.find().exec();
  }
  async checkIfExists(id: string): Promise<User | null> {
    return this.userModel.findOne({ id: id });
  }
  async add(id: string): Promise<User> {
    if (!(await this.checkIfExists(id))) {
      return await new this.userModel({
        id: id,
      }).save();
    }
  }
}
