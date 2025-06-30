import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, googleId: string): Promise<any> {
    let user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      user = new this.userModel({ email, googleId, name: '' });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.googleId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}