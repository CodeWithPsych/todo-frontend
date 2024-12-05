import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await axios.get("https://todo-backend-gold-eight.vercel.app/api/getTodos");
    return response.data.todos;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
    const response = await axios.delete(`https://todo-backend-gold-eight.vercel.app/api/deletetodo/${id}`);
    return response.data;
});

export const newTodo = createAsyncThunk("todos/newTodo", async (todo) => {

    const response = await axios.post(
      "https://todo-backend-gold-eight.vercel.app/api/addtodo/",
      { todo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
});

export const editTodo = createAsyncThunk("todos/editTodo", async ({ id, todo }) => {
    const response = await axios.patch(
      `https://todo-backend-gold-eight.vercel.app/api/updatetodo/${id}`,
      { todo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
});

const initialState = {
  isLoading: false,
  todos: [],
  isError: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload;
      const todoToUpdate = state.todos.find((t) => t._id === id);
      if (todoToUpdate) {
        todoToUpdate.todo = todo;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
        state.isError = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter((todo) => todo._id !== action.payload.id);
        state.isError = false;
        toast.success("Todo deleted Successfully!");
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Something Went Wrong. Please try again later!");
      })
      .addCase(newTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
        state.isError = false;
        toast.success("Todo Added!");
      })
      .addCase(newTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Something Went Wrong. Please try again later!");
      })
      .addCase(editTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, todo } = action.payload;
        const index = state.todos.findIndex((t) => t._id === id);
        if (index !== -1) {
          state.todos[index].todo = todo;
        }
        state.isError = false;
        toast.success("Todo updated Successfully!");
      })
      .addCase(editTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Something Went Wrong. Please try again later!");
      });
  },
});

export const { removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
