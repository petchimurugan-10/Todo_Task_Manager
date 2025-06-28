import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOrCreate(googleId: string, profile: any): Promise<User> {
    let user = await this.findOneByGoogleId(googleId);
    if (!user) {
      user = this.usersRepository.create({
        googleId,
        email: profile.emails[0].value,
        name: profile.displayName,
      });
      await this.usersRepository.save(user);
    }
    return user;
  }

  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { googleId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}