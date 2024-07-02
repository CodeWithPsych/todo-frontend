import React from "react";
import Form from "./components/form";
import Table from "./components/table";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Toaster />
        <Form />
      </div>
      <div className="heading">
        <h3>Todos</h3>
      </div>
      <div className="app">
        <Table />
      </div>
    </>
  );
}

export default App;
