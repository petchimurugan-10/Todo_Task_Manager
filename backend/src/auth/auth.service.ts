import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  googleLogin(req: Request): any {
    if (!req.user) {
      return { message: 'No user from Google' };
    }

    const user = req.user; // Assuming `req.user` contains user info from Google
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User information from Google',
      user,
      token,
    };
  }
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleUser(profile: any): Promise<User> {
    let user = await this.usersService.findOneByGoogleId(profile.id);
    if (!user) {
      user = await this.usersService.findOrCreate(profile.id, profile);
    }
    return user;
  }
}