import { Inject, Injectable } from "@nestjs/common";
import { Collection } from "mongodb";

import { User } from "./user.interface";

@Injectable()
export class UsersService {
  constructor(@Inject("USERS_COLLECTION") private collection: Collection) {}

  async insert(user: User): Promise<boolean> {
    const existed = await this.collection
      .findOne({ username: user.username })
      .then((doc) => !!doc)
      .catch((_) => false);
    if (existed) return false;

    return this.collection
      .insertOne(user)
      .then((_) => true)
      .catch((_) => false);
  }
  findAll(): Promise<User[]> {
    return this.collection
      .find()
      .toArray()
      .then((docs) => docs as User[])
      .catch((_) => []);
  }
  findOne(username: string): Promise<User | null> {
    return this.collection
      .findOne({ username })
      .then((doc) => (!!doc ? (doc as User) : null))
      .catch((_) => null);
  }
}
