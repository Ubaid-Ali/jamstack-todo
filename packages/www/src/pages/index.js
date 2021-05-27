import React, { useEffect, useState } from "react";
import { Container, Button, Heading, Flex, NavLink } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";
import { Link } from "gatsby";

const Index = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    netlifyIdentity.init();
  });

  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on("logout", () => {
    netlifyIdentity.close();
    setUser();
  });

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {user && (<NavLink p={2}>{user.user_metadata.full_name}</NavLink>)}
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">TOD0 /\PP</Heading>
        <Button onClick={() => netlifyIdentity.open()} sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default Index;
