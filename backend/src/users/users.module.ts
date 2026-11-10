import { Module } from '@nestjs/common';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository.js';
import { USER_REPOSITORY_TOKEN } from './repositories/user.repository.interface.js';
import { UsersService } from './users.service.js';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: InMemoryUserRepository,
    },
    UsersService,
  ],
  exports: [UsersService, USER_REPOSITORY_TOKEN],
})
export class UsersModule {}

