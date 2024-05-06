import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesService } from './roles/roles.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // set global route
  // config swagger
   const config = new DocumentBuilder()
     .setTitle('Api Nest JS')
     .setDescription('Api description')
     .setVersion('1.0')
     .build();
   const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha', // Sắp xếp các tag theo thứ tự từ A-Z
    },
  });
  await app.listen(3005);
}
bootstrap();
