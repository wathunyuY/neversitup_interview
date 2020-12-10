import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database.module';
import { UsersService } from './services/users.service';
@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [UsersService]
})
export class AppModule {
  constructor() { }
}
