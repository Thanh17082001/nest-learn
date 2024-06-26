import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { RolesModule } from "./roles/roles.module";
import { ProductsModule } from "./products/products.module";
import { BrandsModule } from "./brands/brands.module";
import { TypesModule } from "./types/types.module";
import { CategoriesModule } from './categories/categories.module';
import { ChatGateway } from './chat/chat.gateway';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JwtSecret,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
      auth: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
      },
    }),
    RolesModule,
    UsersModule,
    ProductsModule,
    BrandsModule,
    TypesModule,
    CategoriesModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
