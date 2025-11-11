import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:3001",
      "https://p8d483jk-3000.inc1.devtunnels.ms",
      //"*"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
