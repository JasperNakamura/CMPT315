import './App.css';
import React from "react";
import {
  BrowserRouter as Router, //Renamed to Router for ease
  Route,
  Routes,
} from "react-router-dom";

//Pages
import Home from "./pages/home";
import NotFoundPage from "./pages/404";

//Links up pages in website
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    </div>
      
    );
}

export default App;

//Use for later when we have loggin users and non logged in users
/*
function Users() {
  return
}
*/