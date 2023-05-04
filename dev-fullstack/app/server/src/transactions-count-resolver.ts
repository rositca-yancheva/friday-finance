import { Ctx, Int, Query, Resolver } from "type-graphql";
import { Context } from "./context";

@Resolver()
export default class TransactionCountResolver {
  @Query(() => Int)
  async countTransactions(@Ctx() { prisma }: Context): Promise<number> {
    return await prisma.transaction.count();
  }
}
