import React from 'react';
import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import SelectInput from '../../../../ReusableComponents/FormsComponents/SelectInput';
import SubmitButton from '../../../../ReusableComponents/FormsComponents/SubmitButton';
import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';

import axios from 'axios';

class AddTheme extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            theme: { code: "", libelle: "", parent: "" },
            parentsOptions: []
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('/api/book/theme/findAll')
        .then((response) => {        
            const state = this.state;
            state.parentsOptions = response.data.results.map(t => t.code + " - " + t.libelle);
            state.parentsOptions.unshift("");
            this.setState(state);
        })
        .catch((err) => { 
            const state = this.state;
            state.error = err.response.data.error;
            this.setState(state);
         });
    }

    handleChange(id, text){
        const state = this.state;
        state.theme[id] = (id==="code") ? text.toUpperCase() : text;
        this.setState(state);
    }

    handleSubmit(e){
        axios.post('/api/book/theme/add', this.state.theme)
        .then((response) => {
            this.setState({ 
                theme: { code: "", libelle: "", parent: "" },
                success: "Thème enregistré.",
                parentsOptions: []
            }, () => { window.setTimeout(
                    () => { this.setState({  theme: { code: "", libelle: "", parent: "" }, success: false, parentsOptions: []}) }, 2000);
            });
        })
        .catch((err) => { 
            const state = this.state;
            state.error = err.response.data.error;
            this.setState(state);
         });
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <h3>Ajouter un thème</h3>
                {this.state.error && <ErrorMessage message={this.state.error} level="danger"/>}
                {this.state.success && <ErrorMessage message={this.state.success} level="success"/>}
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <TextInput label={true}  focus={true} id="code" name="Code" type="text"  maxLength={2}
                        onChange={this.handleChange} value={this.state.theme.code} required="required" col="col-md-4"/>                
                        <TextInput label={true} id="libelle" name="Libelle" type="text" 
                        onChange={this.handleChange} value={this.state.theme.libelle} required="required" col="col-md-4"/>
                        <SelectInput id="parent" name="Thème Parent" value={this.state.theme.parent} 
                                    onChange={this.handleChange} options={this.state.parentsOptions} col="col-md-4"/>
                        <div className="col-md-12"><SubmitButton name="Enregistrer"/></div>
                    </div>
                </form>
            </div>
        );
    }

}

export default AddTheme;