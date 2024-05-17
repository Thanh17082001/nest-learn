import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// import TelegramBot from "node-telegram-bot-api";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api"); // set global route
  // config swagger
  const config = new DocumentBuilder().setTitle("API USING NEST JS").setDescription("Author: Nguyen Thien Thanh").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha", // Sắp xếp các tag theo thứ tự từ A-Z
    },
  });

   const fs = require("fs");
   const path = require("path");
  const outputPath = path.join(__dirname, "swagger.json");
  console.log(outputPath);
   fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), "utf-8");

  const PORT = process.env.PORT
  await app.listen(4000)
}
bootstrap();
