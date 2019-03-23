import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div><h1>Welcome to the main my friend...</h1></div>
        );
    }
}

export default Main;