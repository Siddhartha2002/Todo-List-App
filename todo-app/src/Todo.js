import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import db from "./firebase";
import "./Todo.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
// import ImageIcon from "@mui/icons-material/Image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Todo({ text }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateTodo = () => {
    // update

    db.collection("todos").doc(text.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className={style}
          style={{
            border: "2px solid wheat",
            borderRadius: "10px",
            backgroundColor: "wheat",
            padding: "30px",
            margin: "50px 50px",
          }}
        >
          <h1 style={{}}>Edit your Todo</h1>
          <input
            style={{ marginRight: "10px", padding: "10px" }}
            placeholder={text.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <Button variant="contained" onClick={updateTodo}>
            Update Todo
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={text.todo} secondary="Dummy Deadline ⏰" />
        </ListItem>
        <div className="todo__buttons">
          <Button
            style={{ marginRight: "10px" }}
            variant="contained"
            onClick={(e) => setOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(event) => db.collection("todos").doc(text.id).delete()}
            endIcon={<DeleteIcon />}
          >
            DELETE ME
          </Button>
        </div>
      </List>
    </>
  );
}

export default Todo;
