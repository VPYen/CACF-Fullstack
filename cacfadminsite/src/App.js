// Libraries
import { Component } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";
import RequireAuth from "./components/RequireAuth";

// Pages
import Announcements from "./pages/Announcements";
import Events from "./pages/Events";
import Login from "./pages/Login";

// Assets
import './assets/App.css';

class App extends Component {

  

  handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  handleLogin = () => {
    useNavigate("/announcements");
  }

  render(){
    return (
        <div className="container">
            <NavBar handleLogout={this.handleLogout}/>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/" exact element={<Login />} />
                <Route path="announcements" 
                       exact element={
                                      <RequireAuth>
                                        <Announcements />
                                      </RequireAuth>
                                      } 
                />
                <Route path="events" 
                       exact element={
                                      <RequireAuth>
                                        <Events />
                                      </RequireAuth>
                                      } 
                />
                <Route path="*" element={<Login handleLogin={this.handleLogin} />} />
            </Routes>
        </div>
    );
  }
}

export default App;
