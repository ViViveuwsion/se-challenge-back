import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.NODE_PORT);

  const hostname = os.hostname();

  console.log(`database host              : ${process.env.DATABASE_HOST}`);
  console.log(`database name              : ${process.env.DATABASE_NAME}`);
  console.log(`server started on port     : ${process.env.NODE_PORT}`);
  console.log(`Server running on hostname : ${hostname}`);
}
bootstrap();
