import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesService } from './roles/roles.service';
import { getAllRoles } from './guard/role.enum';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // set global route

  const roleService = app.get(RolesService);
  getAllRoles(roleService);

  // Lấy danh sách các vai trò
  // const roles = await roleService.find();
  // console.log('Danh sách các vai trò:', roles);


   const config = new DocumentBuilder()
     .setTitle('Api Nest JS')
     .setDescription('Api description')
     .setVersion('1.0')
     .addTag('')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
  await app.listen(3005);
}
bootstrap();
