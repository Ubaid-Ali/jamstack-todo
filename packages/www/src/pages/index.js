import React, { useEffect } from "react";
import { Container, Button, Heading, Flex } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";

const Index = () => {
  useEffect(() => {
    netlifyIdentity.init();
  });

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Hello World from Home</Heading>
        <Button onClick={() => netlifyIdentity.open()} sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default Index;
