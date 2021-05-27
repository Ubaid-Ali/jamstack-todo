import React from "react";
import { Container, Button, Heading, Flex } from "theme-ui";

const Index = () => {
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Hello World from Home</Heading>
        <Button onClick={() => alert("Login!")} sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default Index;
