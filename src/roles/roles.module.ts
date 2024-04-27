import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema, Role } from './shcemas/roles.shcema';
import { RolesController } from './roles.controller';

@Module({
  imports: [
      MongooseModule.forFeature([{name:Role.name, schema: RoleSchema}])
  ],
  controllers:[RolesController],
  providers: [RolesService]
})
export class RolesModule {}
