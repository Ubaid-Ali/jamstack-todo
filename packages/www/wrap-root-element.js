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

const client = new ApolloClient({
  link: new HttpLink({
    // uri: "/.netlify/functions/graphql",
    uri: "https://jamstack-todo-ubaid.netlify.app/.netlify/functions/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});

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
