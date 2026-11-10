import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity.js';
import { IUserRepository } from './user.repository.interface.js';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    this.seedDefaultUser();
  }

  private seedDefaultUser() {
    // Seed default developer account for immediate testing
    const defaultEmail = 'demo@tarcin.com';
    const defaultPassword = 'Password123!';
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);
    const id = crypto.randomUUID();
    const now = new Date();

    this.users.set(defaultEmail.toLowerCase(), {
      id,
      email: defaultEmail.toLowerCase(),
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.get(email.toLowerCase().trim());
    return user ? { ...user } : null;
  }

  async findById(id: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.id === id) {
        return { ...user };
      }
    }
    return null;
  }

  async create(userData: { email: string; passwordHash: string }): Promise<User> {
    const normalizedEmail = userData.email.toLowerCase().trim();
    const id = crypto.randomUUID();
    const now = new Date();
    const newUser: User = {
      id,
      email: normalizedEmail,
      passwordHash: userData.passwordHash,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(normalizedEmail, newUser);
    return { ...newUser };
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values()).map((u) => ({ ...u }));
  }
}
