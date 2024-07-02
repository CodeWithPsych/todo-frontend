import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "react-bootstrap/Spinner";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "./popup";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos,editTodo, deleteTodo, removeTodo, updateTodo } from "../todo/todoSlice";
import toast from "react-hot-toast";
import "./table.css";

const Table = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const todos = useSelector((state) => state.todos || []);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const handleEdit = (id, todoText) => {
    
    setCurrentTodoId(id);
    setText(todoText);
    setShowPopup(true);
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setCurrentTodoId(null);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    const trimmedText = text.trim();
    if (trimmedText !== "") {
      dispatch(
        updateTodo({
          id: currentTodoId,
          todo: trimmedText,
        })
      );
      dispatch(editTodo({
        id: currentTodoId,
        todo: trimmedText,
      }))
      closePopup();
    } else {
      toast.error("Text cannot be empty or whitespace only");
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "70px", height: "70px", marginTop: "20px" }}
        />
      </div>
    );
  }

  return (
    <div className="row">
      <Popup
        closePopup={closePopup}
        text={text}
        handleText={handleText}
        display={showPopup}
        handleSubmit={handleSubmit}
      />
      {todos.length === 0 ? (
        <p className="no-todos">No todos found. Add a new one!</p>
      ) : (
        <ul className="list-none">
          {todos.map((todo) => (
            <li className="todo-item" key={todo._id}>
              <div className="todo-text">{todo.todo}</div>
              <div className="buttons">
                <button
                  className="custom editBtn"
                  onClick={() => handleEdit(todo._id, todo.todo)}
                >
                  <EditIcon />
                  <div className="dot"></div>
                </button>
                <button
                  className="custom deleteBtn"
                  onClick={() => {
                    dispatch(removeTodo(todo._id));
                    dispatch(deleteTodo(todo._id));
                  }}
                >
                  <DeleteIcon />
                  <div className="dot"></div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Table;
