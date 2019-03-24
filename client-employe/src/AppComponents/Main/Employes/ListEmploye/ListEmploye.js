import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import EmployeElement from './EmployeElement';

class ListEmploye extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            users: [],
            error: null,
            redirect: false, 
            userId: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        Axios.get('/api/employe/findAll')
        .then((response) => {
            const state = this.state;
            console.log(response);
            //trouve l'id du suer

            state.users = response.data.map((user, i) =>{ return <EmployeElement key={i}  handleClick={this.handleClick}
                user={{nom: user.nom, prenom: user.prenom, sexe: user.sexe, dob: user.date_naissance, id: user.id_utilisateur}}/> });
            this.setState(state);
        })
        .catch((err) => {
            console.log('error');
            console.log(err);
        })
    }

    handleClick(userId){
        const state =this.state;
        state.redirect = true;
        state.userId = userId;
        this.setState(state);
    }


    render(){
        if(this.state.redirect){
            return <Redirect to={"/employe/show/" + this.state.userId}/>;
        }
        return(
            <div>
                <div className="row" style={{fontSize:"1.2em", fontWeight:"bold", marginBottom: "20px"}}>
                    <div className="col-md-3">Nom</div>
                    <div className="col-md-3">Prénom</div>
                    <div className="col-md-3">Sexe</div>
                    <div className="col-md-3">Date de naissance</div>
                </div>
                {this.state.users}
            </div>
        );
    }
}
export default ListEmploye;