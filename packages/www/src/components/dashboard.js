import React, { useContext, useRef } from "react";
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
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

// R E D U C E R
// const todosReducer = (state, action) => {
//   switch (action.type) {
//     case "addTodo":
//       return [{ done: false, value: action.payload }, ...state];

//     case "toggleTodoDone":
//       const newState = [...state];
//       newState[action.payload] = {
//         done: !state[action.payload].done,
//         value: state[action.payload].value,
//       };
//       console.log(`newState[action.payload]`, newState[action.payload]);
//       return newState;

//     default:
//       return state;
//   }
// };

// D A S H B O A R D
const Dashboard = () => {
  // const [todos, dispatch] = useReducer(todosReducer, []);
  // N e t l i f y   A u t h
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  
  const inputRef = useRef();

  // R E T U R N
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

      {/* F O R M */}
      <Flex
        as="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          inputRef.current.value = "";
          await refetch();
        }}
      >
        <Flex sx={{ display: "flex", minWidth: "50%", marginTop: "2%" }}>
          <Label sx={{ display: "flex" }}>
            <span>Add&nbsp;Todo</span>
            <Input ref={inputRef} sx={{ marginLeft: 1 }} />
          </Label>
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Flex>
      </Flex>

      {/* T O D O   L I S T */}
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>Loading...</div> : null} {/* Loading */}
        {error ? <div>{error.message}</div> : null} {/* Error */}
        {!loading && !error ? (
          <ul sx={{ listStyleType: "none" }}>
            {data.todos.map((todo) => (
              <Flex
                as="li"
                key={todo.id}
                onClick={async () => {
                  console.log("Update Todo Invoked");
                  await updateTodoDone({ variables: { id: todo.id } });
                  await refetch();
                }}
              >
                <Checkbox checked={todo.done} readOnly />
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        ) : null}
      </Flex>
    </Container>
  );
};

export default Dashboard;
