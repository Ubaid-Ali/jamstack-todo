const React = require("react");

// theme-ui
const { ThemeProvider } = require("theme-ui");
const { dark } = require("@theme-ui/presets");

// import provider
const { Provider } = require("./netlifyIdentityContext");

const newTheme = {
  ...dark,
  sizes: { container: 1024 },
};

module.exports = ({ element }) => (
  <Provider>
    <ThemeProvider theme={newTheme}>{element}</ThemeProvider>
  </Provider>
);
