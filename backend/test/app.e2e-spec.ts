import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('Authentication & App (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/login (POST) - with valid credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'demo@tarcin.com', password: 'Password123!' })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe('demo@tarcin.com');
  });

  it('/auth/login (POST) - with invalid password returns 401', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'demo@tarcin.com', password: 'IncorrectPassword' })
      .expect(401);
  });

  it('/auth/login (POST) - with invalid email format returns 400', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'not-an-email', password: 'Password123!' })
      .expect(400);
  });

  it('/auth/register (POST) - creates new user and returns 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'e2e-user@tarcin.com', password: 'Password123!' })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe('e2e-user@tarcin.com');
  });
});
