import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'; // Added import for Repository


export class UsersServiceDuplicate { // Changed class name to avoid duplicate identifier
  constructor(private readonly userRepository: Repository<User>) {} // Changed UserRepository to Repository<User>
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ?? undefined; // Ensure it returns undefined instead of null
  }

  async findOneByGoogleId(googleId: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { googleId } });
    return user ?? undefined; // Ensure it returns undefined instead of null
  }

  async findOrCreate(userData: { googleId: string; email: string; name?: string }): Promise<User> {
    let user = await this.findByEmail(userData.email);
    if (!user) {
      user = this.usersRepository.create({
        googleId: userData.googleId,
        email: userData.email,
        name: userData.name,
      });
      user = await this.usersRepository.save(user);
      if (!user) {
        throw new NotFoundException('Failed to create user');
      }
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}