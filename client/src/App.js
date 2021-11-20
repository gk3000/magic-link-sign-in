import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Enter from 'Enter.js'

const URL = 'http://localhost:1337'

function App() {
  let [loggedIn, setLoggedIn]=useState(false)

  const token = JSON.parse(localStorage.getItem("token"));


  useEffect(() => {
    const verify_token = async () => {
      if (token === null) return setLoggedIn(false);
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${URL}/users/verify`);
        return response.data.ok ? login(token) : logout();
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className="App">
    <main>
    <p>You are logged {loggedIn?'in':'out'}</p>
    </main>
    <Routes>
    <Route
    path="enter/:email/:link"
    element={<Enter />}
    />
    </Routes>
    </div>
    );
}

export default App;
