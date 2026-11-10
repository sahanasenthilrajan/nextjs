import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should authenticate pre-seeded demo user successfully', async () => {
    const result = await authService.login({
      email: 'demo@tarcin.com',
      password: 'Password123!',
    });

    expect(result).toBeDefined();
    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe('demo@tarcin.com');
  });

  it('should register a new user and allow logging in', async () => {
    const newUserEmail = 'newuser@tarcin.com';
    const newUserPassword = 'SecurePassword2026!';

    const registerResult = await authService.register({
      email: newUserEmail,
      password: newUserPassword,
    });

    expect(registerResult.accessToken).toBeDefined();
    expect(registerResult.user.email).toBe(newUserEmail);

    const loginResult = await authService.login({
      email: newUserEmail,
      password: newUserPassword,
    });

    expect(loginResult.accessToken).toBeDefined();
    expect(loginResult.user.email).toBe(newUserEmail);
  });

  it('should reject invalid password', async () => {
    await expect(
      authService.login({
        email: 'demo@tarcin.com',
        password: 'WrongPassword!',
      }),
    ).rejects.toThrow('Invalid email or password');
  });

  it('should reject non-existent user', async () => {
    await expect(
      authService.login({
        email: 'nobody@tarcin.com',
        password: 'Password123!',
      }),
    ).rejects.toThrow('Invalid email or password');
  });

  it('should reject duplicate registration', async () => {
    await expect(
      authService.register({
        email: 'demo@tarcin.com',
        password: 'Password123!',
      }),
    ).rejects.toThrow('already exists');
  });
});

