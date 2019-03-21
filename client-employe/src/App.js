import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = { data: null };
  }

  componentDidMount(){
    this.callAPI()
    .then(res => this.setState({data: res.data}))
    .catch(err => console.log(err));
  }

  callAPI = async () => {
    const response = await fetch('api/hi');
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="App">
        {this.state != null &&
          this.state.data
        }
      </div>
    );
  }
}

export default App;
