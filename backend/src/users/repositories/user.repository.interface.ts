import { User } from '../entities/user.entity.js';

export const USER_REPOSITORY_TOKEN = Symbol('IUserRepository');

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(userData: { email: string; passwordHash: string }): Promise<User>;
  findAll(): Promise<User[]>;
}

