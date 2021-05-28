import React from "react";
import { Flex, NavLink } from "theme-ui";
import { Link } from "gatsby";

const Four04 = () => {
  return (
    <div>
      <Flex>Sorry Page Not Found!</Flex>
      <Flex>Go back to:</Flex>
      <Flex>
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
      </Flex>
    </div>
  );
};

export default Four04;
