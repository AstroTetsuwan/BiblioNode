import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from './Nav/Nav';
import Home from './Home/Home';

import AddEmploye from './Employes/AddEmploye/AddEmploye';
import ShowEmploye from './Employes/ShowEmploye/ShowEmploye';
import './Main.css';

class Main extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <BrowserRouter>    
                <div id="global-wrapper" className="container-fluid">
                    <Nav user={this.props.user}/>
                    <div id="main-wrapper">
                        <Switch>
                            <Route exact path="/" component={Home}/>

                            <Route path="/employe/add" component={AddEmploye}/>
                            <Route path="/employe/show/:id" component={ShowEmploye}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;