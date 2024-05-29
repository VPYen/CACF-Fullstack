// Libraries
import { Component } from 'react';

// Components
import LoginControl from '../components/LoginControl';

class Login extends Component{
    constructor(props){
        super(props);
        document.title= "Chi Alpha: Christian Fellowship";
    }

    render(){
        return (
            <LoginControl />
        )
    }
}

export default Login;