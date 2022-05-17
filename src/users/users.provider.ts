import { Db } from "mongodb";

export const usersProvider = {
  provide: "USERS_COLLECTION",
  useFactory: (db: Db) => {
    return db.collection("users");
  },
  inject: ["DATABASE_CLIENT"],
};
