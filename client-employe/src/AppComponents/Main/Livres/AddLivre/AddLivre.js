import React from 'react';
import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import SelectInput from '../../../../ReusableComponents/FormsComponents/SelectInput';

class AddLivre extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            titre:"",
            isbn: "",
            theme: ""
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
                <h3>Ajouter un livre</h3>
                
            </div>
        );
    }

}

export default AddLivre;