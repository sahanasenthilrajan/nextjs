import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

// MongoDB Mongoose connection is preserved and can be enabled by setting ENABLE_MONGODB=true in .env
const enableMongo = process.env.ENABLE_MONGODB === 'true';

const dbImports = enableMongo
  ? [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const uri = config.getOrThrow<string>('MONGODB_URI');
          const scheme = uri.split('://')[0];
          console.log(`[Database] Connecting using scheme: ${scheme}://...`);
          return { uri };
        },
      }),
    ]
  : [];

@Module({
  imports: [
    // Load environment variables from .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'backend/.env'],
    }),

    ...dbImports,

    // Existing Observe configuration
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'backend',
    }),

    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    if (!enableMongo) {
      console.log(
        '[Database] Running with in-memory repository (MongoDB temporarily disabled). Set ENABLE_MONGODB=true in .env to connect to MongoDB Atlas.',
      );
    }
  }
}
