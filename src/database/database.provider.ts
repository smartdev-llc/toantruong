import { MongoClient } from "mongodb";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () => {
      const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";

      const dbClient = new MongoClient(uri);

      const ok = await dbClient
        .connect()
        .then((c) => c.db("admin").command({ ping: 1 }))
        .then((_) => true)
        .catch((_) => false);

      return ok ? dbClient : null;
    },
  },
  {
    provide: "DATABASE_CLIENT",
    useFactory: (conn: MongoClient) => {
      return conn.db("smartdev_candidate");
    },
    inject: ["DATABASE_CONNECTION"],
  },
];
