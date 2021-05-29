import React, { useContext } from "react";
import { Router } from "@reach/router";
import { Flex, Heading, Button } from "theme-ui";

import { IdentityContext } from "../../netlifyIdentityContext";
import Dashboard from "../components/dashboard";

let DashLoggedOut = () => {
  const { identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Flex sx={{ flexDirection: "column", padding: 3 }}>
      <Heading as="h1">TOD0 /\PP</Heading>
      <Button onClick={() => netlifyIdentity.open()} sx={{ marginTop: 2 }}>
        Login
      </Button>
    </Flex>
  );
};

const App = () => {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    );
  }
  return (
    <Router>
      <Dashboard path="/app" />
    </Router>
  );
};

export default App;
