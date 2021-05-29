import React, { useContext, useReducer, useRef, useState } from "react";
import {
  Container,
  Flex,
  NavLink,
  Input,
  Label,
  Button,
  Checkbox,
} from "theme-ui";
import { Link } from "@reach/router";
import { IdentityContext } from "../../netlifyIdentityContext";

const initialTodos = [{ done: false, value: "1st Todo" }];

const todosReducer = (state = initialTodos, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];

    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      console.log(`newState[action.payload]`, newState[action.payload]);
      return newState;

    default:
      return state;
  }
};

// DASHBOARD COMPONENT
const Dashboard = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  // Netlify Auth
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  const inputRef = useRef();

  console.log(`todos: `, todos);
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
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            {" "}
            Logout {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      {/* FORM */}
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: "addTodo",
            payload: inputRef.current.value,
          });
          inputRef.current.value = "";
        }}
      >
        <Flex>
          <Label sx={{ display: "flex" }}>
            <span>Add&nbsp;Todo</span>
            <Input ref={inputRef} sx={{ marginLeft: 1 }} />
          </Label>
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Flex>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        <ul sx={{ listStyleType: "none" }}>
          {todos.map((todo, i) => (
            <Flex
              as="li"
              key={i}
              onClick={() => {
                dispatch({ type: "toggleTodoDone", payload: i });
              }}
            >
              <Checkbox checked={todo.done} readOnly />
              <span>{todo.value}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  );
};

export default Dashboard;
