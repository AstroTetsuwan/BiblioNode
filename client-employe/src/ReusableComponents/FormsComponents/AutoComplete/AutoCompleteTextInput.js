import React from 'react';
import axios from 'axios';

class AutoCompleteTextInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount(){
        if(this.props.focus)
            document.getElementById(this.props.id).focus();
    }

    handleChange(e){
        //THAt's what you want to call when autocompleteelement is selected -> passing it's value
        this.props.onChange(this.props.id, e.target.value);
        if(e.target.value.length >= 2){
            axios.get('/api/book/autocomplete/auteur/' + e.target.value)
            .then(results => console.log(results.data.results))
            .catch(err => console.log(err));
        }
    }

    handleKeyPress(e){
        console.log(e.key);
        console.log(e.keyCode); //ArrowUp 38 - ArrowDown 40 - Enter 13 -> should prevent From Submitting some way (stopPropagation ?)
        //if this.state.autocomplete(so Autocomplete Box Is Displayed) -> ( pass new index to "Select" )
    }

    render(){
        return(
            <div className={"form-group " + (this.props.col || "") }>
                
                {this.props.label && <label htmlFor={this.props.id}>{this.props.name}</label>}
                
                <input type={this.props.type} name={this.props.id} className="form-control" required={this.props.required} onKeyDown={this.handleKeyPress}
                id={this.props.id} placeholder={this.props.placeholder || this.props.name} value={this.props.value} onChange={this.handleChange}/>

            </div>
        );
    }
}

export default AutoCompleteTextInput;