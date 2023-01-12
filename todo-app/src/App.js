import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { FormControl, Input, InputLabel } from "@mui/material";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed

  // it runs once when the component loads
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); // prevents page refreshing

    // adding the todo directly to db from input
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Clearing the input
    setInput("");
  };

  return (
    <div className="App">
      <div className="nav">
        <h1>Todo App</h1>
        <form style={{ marginBottom: "14px" }}>
          <FormControl>
            <InputLabel>✅ Write a Todo</InputLabel>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
          </FormControl>

          <Button
            disabled={!input}
            variant="contained"
            type="submit"
            onClick={addTodo}
          >
            Add Todo
          </Button>
        </form>
      </div>

      <ul className="app__todos">
        {todos.map((todo) => (console.log(todo), (<Todo text={todo} />)))}
      </ul>
    </div>
  );
}

export default App;
