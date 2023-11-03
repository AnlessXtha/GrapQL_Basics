const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});
/**
typeDefs
- Everything, every piece of data every type that you define ,every query you define in graphql everything you do will exist inside of this typedefs variable

resolvers
- All of the funtions that resolve those types and do stuff like make calls to APIs make, calls to databases, send data back, all those functions will be enclosed inside a variable which is called the resolvers
- functions that deals with the data
 */

server.listen(4001).then(({ url }) => {
  console.log(`Your API is running at: ${url}`);
});
