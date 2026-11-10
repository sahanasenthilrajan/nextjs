import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import dns from 'node:dns';
import {
  AppModule,
  ObserveInstrument,
} from './app.module.js';

// Ensure DNS SRV resolution succeeds on Windows/local DNS for MongoDB Atlas (mongodb+srv://)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Fallback to default system DNS if setServers is restricted
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Global request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS for Next.js frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  });

  const PORT = process.env.PORT || 3001;

  await app.listen(PORT);

  console.log(`NestJS Backend running at http://localhost:${PORT}`);
}

bootstrap();
