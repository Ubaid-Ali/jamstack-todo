import React, { useContext } from "react";
import { Container, Button, Heading, Flex, NavLink } from "theme-ui";
import { Link } from "gatsby";
import { IdentityContext } from "../../netlifyIdentityContext";

const Index = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink href="#!" p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">TOD0 /\PP</Heading>
        <Button onClick={() => netlifyIdentity.open()} sx={{ marginTop: 2 }}>
          {user ? "Logout" : "Login"}
        </Button>
      </Flex>
    </Container>
  );
};

export default Index;
