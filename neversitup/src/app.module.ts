import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProfileMiddleware } from './auth.middleware';
import { UserManageMentService } from './services/user-management.service';
import { AuthenticationService } from './services/authentication.service';
import { ProfileController } from './profile.controller';
import { ProductController } from './product.controller';
import { OrderController } from './order.controller';
import { ProductManageMentService } from './services/product-management.service';
import { OrderManageMentService } from './services/order-management.service';

@Module({
  imports: [],
  controllers: [AppController,ProfileController,ProductController,OrderController],
  providers: [
    AuthenticationService,
    UserManageMentService,
    ProductManageMentService,
    OrderManageMentService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProfileMiddleware)
      .forRoutes('profile','product','order');
  }
}