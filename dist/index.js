"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const express_session_1 = __importDefault(require("express-session"));
const apollo_server_core_1 = require("apollo-server-core");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const user_1 = require("./resolvers/user");
const User_1 = require("./entities/User");
const main = async () => {
    const connection = await (0, typeorm_1.createConnection)({
        type: "postgres",
        host: "localhost",
        port: 5432,
        database: "state-test",
        username: "apple",
        password: "",
        logging: true,
        synchronize: true,
        entities: [User_1.User],
    });
    const app = (0, express_1.default)();
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: "https://localhost:3000",
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: "",
        saveUninitialized: false,
        secret: "asdqwuhewquheadjsbdjsdsad",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground],
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver],
            validate: true,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/graphql");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map