import {
  makeSchema,
  objectType,
} from 'nexus';
import path from 'path';

import { Context } from './context';

const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nullable.string("color");
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allCategories", {
      type: "Category",
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.category.findMany();
      },
    });
  },
});

export const schema = makeSchema({
  types: [Category, Query],
  outputs: {
    schema: path.join(process.cwd(), "src/server/generated/schema.graphql"),
    typegen: path.join(process.cwd(), "src/server/generated/nexus.ts"),
  },
  contextType: {
    module: path.join(process.cwd(), "src/server/context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
