import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { AuthService } from "./../auth/auth.service";
import { JwtAuthGuard } from "./../auth/jwt-auth.guard";
import { LocalAuthGuard } from "./../auth/local-auth.guard";
import { PwEncryptPipe } from "./pw-encrypt.pipe";
import { User } from "./user.interface";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post("register")
  async register(@Body(new PwEncryptPipe()) user: User) {
    const ok = await this.usersService.insert(user);

    if (ok) {
      return {
        status: "succeeded",
        result: user,
      };
    }

    return {
      status: "failed",
      result: null,
      message: "Unable to register user",
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Body() user: User) {
    return this.authService.login(user);
  }
}
