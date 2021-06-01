const { ApolloServer, gql } = require("apollo-server-lambda");

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
    todos: (parent, args, { user }) => {
      if (!user) {
        console.log(`user is not available: return empty array `, user);
        return [];
      } else {
        console.log(`user is available: return todos `, user);
        return Object.values(todos);
      }
    },
  },
  Mutation: {
    addTodo: (_, { text }) => {
      todoIndex++;
      const id = `key-${todoIndex}`;
      todos[id] = { id, text, done: false };
      return todos[id];
    },
    updateTodoDone: (_, { id }) => {
      todos[id].done = true;
      return todos[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      console.log(
        "context.clientContext.user: 'Founded' ",
        context.clientContext.user
      );
      return { user: context.clientContext.user.sub };
    } else {
      console.log("context.clientContext.user: 'Not Found': \ context is: ", context );
      return {};
    }
  },
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
