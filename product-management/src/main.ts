import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        host:'nvs_product',
        port:8879
      }
    },
  );
  app.listen(() => console.log('Microservice User-Management is listening'));
}
bootstrap();