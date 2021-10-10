import { User } from "../entities/User";
import { Resolver, Query } from "type-graphql";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello World!";
  }
}
