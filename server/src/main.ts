import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  });

  const port = process.env.PORT || 5000; // Changed to 3000
  const host = '0.0.0.0';

  await app.listen(port, host);

  console.log('\n=================================');
  console.log(`🚀 NestJS Backend is running!`);
  console.log(`🔗 Local:            http://localhost:${port}`);
  console.log(`🔗 Network:          http://${host}:${port}`);
  console.log('=================================\n');
}
bootstrap();