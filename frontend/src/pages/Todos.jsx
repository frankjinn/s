import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const TodosContext = React.createContext({
  todos: [],
  fetchTodos: () => {},
});

function AddTodo() {
  const [item, setItem] = React.useState("");
  const { todos, fetchTodos } = React.useContext(TodosContext);
  const handleInput = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = (event) => {
    const newTodo = {
      id: todos.length + 1,
      item: item,
    };

    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    }).then(fetchTodos);
  };
}

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo");
    const todos = await response.json();
    setTodos(todos.data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <TodosContext.Provider value={{ todos, fetchTodos }}>
      <Stack spacing={5}>
        {console.log(todos)}
        {todos?.map((todo) => (
          <b>{todo.item}</b>
        ))}
      </Stack>
    </TodosContext.Provider>
  );
}
