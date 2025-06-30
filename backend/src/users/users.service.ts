import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ?? undefined;
  }

  async findOneByGoogleId(googleId: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ googleId }).exec();
    return user ?? undefined;
  }

  async findOrCreate(userData: { 
    googleId: string; 
    email: string; 
    name?: string 
  }): Promise<User> {
    let user = await this.findByEmail(userData.email);
    if (!user) {
      const createdUser = new this.userModel({
        googleId: userData.googleId,
        email: userData.email,
        name: userData.name,
      });
      user = await createdUser.save();
      if (!user) {
        throw new NotFoundException('Failed to create user');
      }
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
