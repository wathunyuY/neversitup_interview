// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        host:'127.0.0.1',
        port:8877
      }
    },
  );
  app.listen(() => console.log('Microservice Auth is listening'));
}
bootstrap();