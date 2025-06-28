import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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