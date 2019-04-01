import React from 'react';
import TextInput from '../../../ReusableComponents/FormsComponents/TextInput'
import SubmitButton from '../../../ReusableComponents/FormsComponents/SubmitButton';

class ScanExemplaire extends React.Component{
   constructor(props){
    super(props);

    this.state = { idexemplaire : ""};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }   


    handleChange(id, text){
        const state = this.state;
        state[id] = text;
        this.setState(state);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.handleSubmit(this.state.idexemplaire);       
    }

    render(){ return(
        <form onSubmit={this.handleSubmit}>
            <div className="row">
                <TextInput label={true}  focus={true} id="idexemplaire" name="ID exemplaire" type="text" 
                    onChange={this.handleChange} value={this.state.idexemplaire} required="required" col="col-md-6"/>
                <div style={{paddingTop: "25px"}}><SubmitButton name="Enregistrer"/></div>
            </div>
        </form>
    );}
}

export default ScanExemplaire;