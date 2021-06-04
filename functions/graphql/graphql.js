require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodoDone(id: ID!): Todo
  }
`;

const todos = {};
let todoIndex = 0;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: async (parent, args, { user }) => {
      if (!user) {
        return [];
      } else {
        const result = await client.query(
          q.Paginate(q.Match(q.Index("todos_by_user"), user))
        );
        return result.data.map(([ref, text, done]) => ({
          id: ref.id,
          text,
          done,
        }));
      }
    },
  },
  Mutation: {
    // A D D
    addTodo: async (_, { text }) => {
      if (!user) {
        throw new Error("Must be authenticated to insert todos!");
      }
      const result = await client.query(
        q.Create(q.Collection("todos"), {
          data: { text, done: false, owner: user },
        })
      );
      return { ...result.data, id: result.ref.id };
    },
    // U P D A T E
    updateTodoDone: async (_, { id }) => {
      if (!user) {
        throw new Error("Must be authenticated to update todos!");
      }
      const result = await client.query(
        q.Update(q.Ref(q.Collection("todos"), id), {
          data: { done: true },
        })
      );
      return { ...result.data, id: result.ref.id };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
