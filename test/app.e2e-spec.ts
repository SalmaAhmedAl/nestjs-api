import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async ()=>{
    const moduleRef = 
      await Test.createTestingModule({
        imports:[AppModule]
      }).compile();

      app = moduleRef.createNestApplication();
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist:true,
        }),
      );
      prisma = app.get(PrismaService);
      await app.init();
      await prisma.cleanDb();
  });

  afterAll(()=>{
    app.close();
  });
  it.todo('should test');
});

