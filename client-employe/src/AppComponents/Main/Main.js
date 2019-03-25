import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from './Nav/Nav';
import Home from './Home/Home';

import AddAdherent from './Adherent/AddAdherent/AddAdherent';
import ShowAdherent from './Adherent/ShowAdherent/ShowAdherent';
import SearchAdherent from './Adherent/SearchAdherent/SearchAdherent';

import AddEmploye from './Employes/AddEmploye/AddEmploye';
import ListEmploye from './Employes/ListEmploye/ListEmploye';
import ShowEmploye from './Employes/ShowEmploye/ShowEmploye';
import UpdateEmploye from './Employes/UpdateEmploye/UpdateEmploye';
import DeleteEmploye from './Employes/DeleteEmploye/DeleteEmploye';

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

                            <Route path="/adherent/add" component={AddAdherent}/>
                            <Route path="/adherent/show/:id" render={(props) => <ShowAdherent {...props}  user={this.props.user}/>}/>
                            <Route path="/adherent/search" component={SearchAdherent}/>

                            <Route path="/employe/add" component={AddEmploye}/>
                            <Route path="/employe/list" component={ListEmploye}/>
                            <Route path="/employe/show/:id" component={ShowEmploye}/>
                            <Route path="/employe/update/:id" component={UpdateEmploye}/>
                            <Route path="/employe/delete/:id" component={DeleteEmploye}/>
                           
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;