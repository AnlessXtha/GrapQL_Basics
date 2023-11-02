import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./DisplayData";

// ApolloClient is a class used to connect to an API using its instance

// Apollo Client libaray has a really good state management aspect to it. It allows you cache information and data into your browser. So, basically if you fetch some data and change a component for example moving it in your route system and you want the data to be updated or you might want the data to be the same thing, you dont want to need to refresh the page every time you move because think about it this way if you render a component and you go back to another component, making a request every time you render a component might be an overkill and if you want you can just cache your data and the data will maintain the same because there werent any changes to the data to begin with. So, this is basically what cache is in the graphql. ANd with apollo client library they have an option which is basically just determining that your cache is in memory which means its going to literally save that information or cache the data in memory.

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4001/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <div>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
