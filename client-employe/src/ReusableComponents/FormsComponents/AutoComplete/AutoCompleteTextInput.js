import React from 'react';
import axios from 'axios';

import AutoCompleteResultsBox from './AutoCompleteResultsBox';

class AutoCompleteTextInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            searchResults: [],
            autoCompleteCurrentSelectedIndex: 0,
            autoCompleteHidden: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleAutoCompleteClick = this.handleAutoCompleteClick.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
    }
    componentDidMount(){
        if(this.props.focus)
            document.getElementById(this.props.id).focus();
    }

    handleChange(e){
        //THAt's what you want to call when autocompleteelement is selected -> passing it's value
        this.props.onChange(this.props.id, e.target.value);
        if(e.target.value.length >= 2){
            axios.get(this.props.autoCompleteURL + e.target.value)
            .then(results => {
                const state =  this.state;
                state.searchResults = results.data.results;
                state.autoCompleteHidden = results.data.results.length > 0 ? false : true;
                this.setState(state);
            })
            .catch(err => console.log(err));
        } else {
            const state =  this.state;
            state.searchResults = [];
            state.autoCompleteHidden = true;
            this.setState(state);
        }
    }

    handleKeyPress(e){

        if(!this.state.autoCompleteHidden) {
            switch(e.keyCode){
                case 38: if(this.state.autoCompleteCurrentSelectedIndex > 0)
                    { this.updateselectedIndex(this.state.autoCompleteCurrentSelectedIndex - 1); } 
                    break;
                case 40: if(this.state.autoCompleteCurrentSelectedIndex < this.state.searchResults.length - 1) { 
                        this.updateselectedIndex(this.state.autoCompleteCurrentSelectedIndex + 1); } 
                        break;
                case 13:  
                        this.props.onAutoCompleteSelection(this.props.id, this.state.searchResults[this.state.autoCompleteCurrentSelectedIndex]); 
                        this.hideAutoComplete(true);
                        break;
                default: break;
            }
        }
    }

    updateselectedIndex(i){
        const state =  this.state;
        state.autoCompleteCurrentSelectedIndex = i;
        this.setState(state);
    }

    handleAutoCompleteClick(e){
        let selectedIndex = e.target.id.split('-')[1];
        console.log("here");
        console.log(this.state.searchResults[selectedIndex]);
        console.log("here");
        this.props.onAutoCompleteSelection(this.props.id, this.state.searchResults[selectedIndex]);        
        this.hideAutoComplete(true);
    }

    handleFocusOut(e){
        //FOCUS EVENT IS FIRED BEFORE I GET THE CLICK EVENT ON THE AUTOCOMPLETE BOX -> So it's not really working, so I'll let autocomplete stuff for later
        this.hideAutoComplete(true);
    }

    hideAutoComplete(hide){
        const state =  this.state;
        state.autoCompleteHidden = hide;
        this.setState(state);
    }

    render(){
        return(
            <div className={"form-group " + (this.props.col || "") }>
                
                {this.props.label && <label htmlFor={this.props.id}>{this.props.name}</label>}
                
                <input type={this.props.type} name={this.props.id} className="form-control" required={this.props.required} 
                onBlur={this.handleFocusOut} onKeyDown={this.handleKeyPress} id={this.props.id} onChange={this.handleChange}
                placeholder={this.props.placeholder || this.props.name} value={this.props.value}/>

                <AutoCompleteResultsBox hidden={this.state.autoCompleteHidden} inputTarget={this.props.id} handleClick={this.handleAutoCompleteClick}
                 options={this.state.searchResults} selectedIndex={this.state.autoCompleteCurrentSelectedIndex}/>

            </div>
        );
    }
}

export default AutoCompleteTextInput;