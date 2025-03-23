import react from "react";
import "./App.css";
import MainTodo from "./MainTodo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/MainTodo" element={<MainTodo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
