import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('An account with this email address already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);
    const user = await this.usersService.create(dto.email, passwordHash);

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Account created successfully',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Signed in successfully',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return { id: user.id, email: user.email };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

