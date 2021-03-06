import * as React from "react";
import * as ReactDOM from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { App } from "./components/App";
import "./index.css";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:9000/shop" }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
