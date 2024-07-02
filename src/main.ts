import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // You can restrict this to specific origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.NODE_PORT);

  const hostname = os.hostname();

  console.log(`database host              : ${process.env.DATABASE_HOST}`);
  console.log(`database name              : ${process.env.DATABASE_NAME}`);
  console.log(`server started on port     : ${process.env.NODE_PORT}`);
  console.log(`Server running on hostname : ${hostname}`);
}
bootstrap();
