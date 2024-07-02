import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newTodo } from "../todo/todoSlice";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import "./form.css";

const form = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      dispatch(newTodo(trimmedInput));
      setInput("");
    } else {
      toast.error("Text cannot be empty or whitespace only");
    }
  };

  return (
    <div className="main">
      <div className="form">
        <h1>Todo using Redux tookit</h1>
        <Form onSubmit={addTodoHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <h4>
                <u>Create Todo</u>
              </h4>
            </Form.Label>
            <Form.Control
              type="Text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your todo..."
            />
            <button type="submit" className="custom-btn btn-9 ">
              Add Now
            </button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default form;
