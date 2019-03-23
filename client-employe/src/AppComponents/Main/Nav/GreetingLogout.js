import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';

class GreetingLogout extends React.Component{

    constructor(props){
        super(props);
        this.state = {loggedOut: false};
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        axios.get('/api/employe/logout')
        .then((response) => {
            console.log(response);
            console.log(this);
            window.alert(response.data.message);
            
            this.context.history.push('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render(){
        return(           
            <p style={{display: "flex", justifyContent:"space-between", padding:"1vh", fontSize:"1.2em"}}>
                <span>Bonjour {this.props.user.pseudo}</span>
                <span style={{marginRight:"3em", fontSize:"1.8em"}}>Biblitohèque des Marmots</span>
                <span style={{color: "rgb(35,82,156)", cursor:"pointer"}} onClick={this.handleLogout}>Log out</span>
            </p>
        );
    }

}

export default withRouter(GreetingLogout);
