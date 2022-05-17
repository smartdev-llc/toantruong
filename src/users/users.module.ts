import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";

import { AuthModule } from "./../auth/auth.module";
import { DatabaseModule } from "./../database/database.module";
import { UsersValidationMiddleware } from "./users-validation.middleware";
import { UsersController } from "./users.controller";
import { usersProvider } from "./users.provider";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersProvider],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  exports: [UsersService, usersProvider],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersValidationMiddleware)
      .forRoutes("users/register", "users/login");
  }
}
