import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import PageNotFound from './components/PageNotFound';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
      console.log(user, "line no 13");
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {isLoggedIn ?
            <Route path="/home" element={<Home />}></Route>
            :
            <Route path="/home" element={<PageNotFound />}></Route>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
