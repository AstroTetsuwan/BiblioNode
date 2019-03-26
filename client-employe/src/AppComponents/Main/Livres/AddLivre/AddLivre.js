import React from 'react';
import AutoCompleteTextInput from '../../../../ReusableComponents/FormsComponents/AutoComplete/AutoCompleteTextInput';

class AddLivre extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            nomAuteur:""
        }
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id, text){
        const state = this.state;
        state[id] = text;
        this.setState(state);
    }

    render(){
        return(
            <div>
                <h1>Add livre</h1>
                <AutoCompleteTextInput  focus={true} id="nomAuteur" name="Nom" type="text" onChange={this.handleChange} 
                value={this.state.nomAuteur} required="required" col="col-md-6" label={true}/>
            </div>
        );
    }

}

export default AddLivre;