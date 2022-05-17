import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

import { User } from "./../users/user.interface";
import { UsersService } from "./../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);

    if (user && (await compare(password, user.pwHash))) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
