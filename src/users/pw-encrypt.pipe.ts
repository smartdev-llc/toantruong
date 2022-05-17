import { Injectable, PipeTransform } from "@nestjs/common";
import { genSalt, hash } from "bcrypt";

@Injectable()
export class PwEncryptPipe implements PipeTransform {
  async transform(userDto: any) {
    const { password } = userDto;

    const salt = await genSalt();
    userDto.pwHash = await hash(password, salt);
    delete userDto.password;

    return userDto;
  }
}
