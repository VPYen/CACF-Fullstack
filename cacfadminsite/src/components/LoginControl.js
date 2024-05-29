// Libraries
import React from "react";
import { Navigate } from "react-router-dom";

// Components
import Service from '../components/Service';

class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        secretKey: "",
        loginError: "",
        regError: "",
        loginToggle: true,
      };
      this.handleLoginToggle = this.handleLoginToggle.bind(this);
    }

    submitLogin = async (event) => {
      event.preventDefault();
      this.setState({error: ""});
      let body = {
          username: this.state.username,
          password: this.state.password
      }
      console.log(body);
      await Service.loginUser(body)
      .then(response => {
        if (response.error){
          this.setState({loginError: response.error});
        }else{
          sessionStorage.setItem("username", response.user.username);
          sessionStorage.setItem("token", response.user.password);
          window.location.reload();
        }
      })
    }

    submitRegister = async (event) => {
        event.preventDefault();
        let body = {
            username: this.state.username,
            password: this.state.password,
            key: this.state.secretKey,
        }
        await Service.registerUser(body)
        .then(response => {
          if (response.error){
            this.setState({regError: response.error});
          }else{
            sessionStorage.setItem("username", response.user.username);
            sessionStorage.setItem("token", response.user.password);
            window.location.reload();
          }
        });
    }

    onInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


    handleLoginToggle(){
        return this.state.loginToggle ? this.setState({loginToggle: false}) : this.setState({loginToggle: true}); 
    }


    render(){
        const loginToggle = this.state.loginToggle;
        if (sessionStorage.getItem("username") && sessionStorage.getItem("token")) {
          return <Navigate to="/announcements" replace />
        }else{
          if (loginToggle){
              return <div id="login" className="container">
                          <h1 className="title">Login</h1>
                          <hr />
                          {this.state.loginError ? <p className="loginError">{this.state.loginError}</p> : null}
                          <form className="loginForm" onSubmit={this.submitLogin}>
                              <label htmlFor="loginUser">Username</label>
                              <input type="text" id="loginUser" name="username" value={this.state.username} onChange={this.onInputChange} />
                              <label htmlFor="loginPass">Password</label>
                              <input type="password" id="loginPass" name="password" value={this.state.password} onChange={this.onInputChange} />
                              <div id="register">
                                  <p>Don't have an account? <a onClick={this.handleLoginToggle}>Register</a></p>
                              </div>
                              <button type="submit" className="submitButton" >Submit</button>
                          </form>
                      </div>
          }else {
              return  <div id="register" className="container">
                          <h1 className="title">Register</h1>
                          <hr />
                          {this.state.regError ? <p className="loginError">{this.state.regError}</p> : null}
                          <form className="loginForm" onSubmit={this.submitRegister}>
                              <label htmlFor="registerUser">Username</label>
                              <input type="text" id="registerUser" name="username" value={this.state.username} onChange={this.onInputChange} />
                              <label htmlFor="registerPass">Password</label>
                              <input type="password" id="registerPass" name="password" value={this.state.password} onChange={this.onInputChange} />
                              <label htmlFor="secretKey">Secret Key</label>
                              <input type="password" id="secretKey" name="secretKey" value={this.state.secretKey} onChange={this.onInputChange} />
                              <div id="register">
                                  <a onClick={this.handleLoginToggle}>Back to login</a>
                              </div>
                              <button type="submit" className="submitButton" >Submit</button>
                          </form>
                      </div>
          }
        }
    }
}

export default LoginControl;