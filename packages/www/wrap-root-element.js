const React = require("react");
// import theme-ui
const { ThemeProvider } = require("theme-ui");
const { dark } = require("@theme-ui/presets");
// import netlify Auth
const { Provider } = require("./netlifyIdentityContext");
const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} = require("@apollo/client");
const fetch = require("cross-fetch");
const { setContext } = require("apollo-link-context");
const netlifyIdentity = require("netlify-identity-widget");

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  // uri: "/.netlify/functions/graphql",
  uri: "https://jamstack-todo-ubaid.netlify.app/.netlify/functions/graphql",
  fetch,
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

console.log(`authLink.concat(httpLink): `, authLink.concat(httpLink));

const newTheme = {
  ...dark,
  sizes: { container: 1024 },
};

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider>
      <ThemeProvider theme={newTheme}>{element}</ThemeProvider>
    </Provider>
  </ApolloProvider>
);

module.exports = wrapRootElement;
