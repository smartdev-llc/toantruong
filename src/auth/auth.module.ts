import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "./../users/users.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      //TODO: move to configuration file later
      secret: "smartdev",
      signOptions: { expiresIn: "120s" },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
