import React from 'react';
import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';

class AuteurInputs extends React.Component{
    constructor(props){
        super(props);
        this.handleChangeNom = this.handleChangeNom.bind(this);
        this.handleChangePrenom = this.handleChangePrenom.bind(this);
    }

    handleChangeNom(id, value){
        this.props.onChange(this.props.idNom, value, this.props.auteurPrincipal);
    }
    handleChangePrenom(id, value){
        this.props.onChange(this.props.idPrenom, value, this.props.auteurPrincipal);
    }
    render(){
        return(
            <div className="row">
                <TextInput label={true} id={this.props.idNom} name="Nom" type="text"
                    onChange={this.handleChangeNom} value={this.props.nom} required="required" col="col-md-4"/>
                <TextInput label={true} id={this.props.idPrenom} name="Prenom" type="text"
                    onChange={this.handleChangePrenom} value={this.props.prenom} col="col-md-4"/>  
                <div className="col-md-2">    
                    <i style={{paddingTop:"28px", cursor:"pointer"}} onClick={this.props.addAuteurInput} className="fas fa-plus fa-2x"></i>
                </div>
                {this.props.removeAuteurInput && 
                    <div className="col-md-2">    
                        <i style={{paddingTop:"28px", cursor:"pointer"}} className="fas fa-minus fa-2x"
                            onClick={() => this.props.removeAuteurInput(this.props.idNom.split('-')[2])}></i>
                    </div>
                }
            </div>  
        );
    }
}

export default AuteurInputs;