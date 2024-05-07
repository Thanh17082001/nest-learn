import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { RolesModule } from "./roles/roles.module";
import { ProductsModule } from "./products/products.module";
import { BrandsModule } from "./brands/brands.module";
import { TypesModule } from "./types/types.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JwtSecret,
      signOptions: { expiresIn: "60m" },
    }),
    MongooseModule.forRoot(process.env.DB),
    RolesModule,
    UsersModule,
    ProductsModule,
    BrandsModule,
    TypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
