import { Inject, Injectable } from '@nestjs/common';
import type { User } from './entities/user.entity.js';
import type { IUserRepository } from './repositories/user.repository.interface.js';
import { USER_REPOSITORY_TOKEN } from './repositories/user.repository.interface.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(email: string, passwordHash: string): Promise<User> {
    return this.userRepository.create({ email, passwordHash });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
