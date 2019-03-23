import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Login from './AppComponents/Login/Login';
import Main from './AppComponents/Main/Main';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount(){
    this.isUserLoggedIn();
  }

  isUserLoggedIn(){
    axios.get('/api/employe/getLoggedUser')
    .then((response) => {
      let user = response.data;
      if(user.categorieUtilisateur === "EMPLOYE"){
        this.setState({user: user});
      }
    })
    .catch((err) => {
      console.log("FAILURE loggedin REQUEST");
      console.log(err.response); 
    });
  }

  handleLogin(user){
    this.setState({user: user});
  }

  render() {
    return (     
        <div className="App">
          {this.state.user === null &&
            <Login handleLogin={this.handleLogin}/>
          }
          {this.state.user !== null &&
            <Main user={this.state.user}/>
          }

        </div>
    );
  }
}

export default App;
