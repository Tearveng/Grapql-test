import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import session from "express-session";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "cors";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/User";

const main = async () => {
  // const RedisStore = connectRedis(session);
  // const redis = new Redis(process.env.REDIS_URL);

  // sendEmail("admin@gmail.com", "dasdasdasdasd");

  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "state-test",
    username: "apple",
    password: "",
    logging: true,
    synchronize: true,
    entities: [User],
  });

  // await conn.runMigrations();
  // await Post.delete({});

  const app = express();
  app.set("trust proxy", 1);

  app.use(
    cors({
      // origin: process.env.CORS_ORIGIN,
      origin: "https://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "",
      // store: new RedisStore({
      //   client: redis,
      //   disableTouch: true,
      // }),
      // cookie: {
      //   maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      //   httpOnly: true,
      //   sameSite: "lax", // csrf
      //   secure: __prod__, // cookie only work in https
      //   domain: __prod__ ? ".vengstack.xyz" : undefined,
      // },
      saveUninitialized: false,
      // secret: process.env.SESSION_SECRET as string,
      secret: "asdqwuhewquheadjsbdjsdsad",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      // redis,
      // userLoader: createUserLoader(),
      // updootLoader: createUpdootLoader(),
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  // app.listen(process.env.PORT, () => {
  //   console.log("Server started on http://localhost:4000/graphql");
  // });
  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });
};

main().catch((err) => {
  console.log(err);
});
