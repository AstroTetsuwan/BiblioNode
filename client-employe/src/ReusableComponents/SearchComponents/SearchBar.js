import React from 'react';

import SubmitButton from '../FormsComponents/SubmitButton';
import TextInput from '../FormsComponents/TextInput'

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {searchVal: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        this.props.onSearch(this.state.searchVal, 1);
        e.preventDefault();
    }

    handleChange(id, text){
        this.setState({searchVal: text});
    }
    
    render(){
        return (
            <div className="row">
                <form onSubmit={this.handleSubmit} style={{textAlign:"center"}}>
                    <div className="form-group">
                        <div className="col-md-10">
                            <TextInput id="search-bar" name="Rechercher" placeholder="Rechercher par nom ou pseudo" 
                                type="text" onChange={this.handleChange} value={this.state.searchVal} required="required" focus={true}/>
                        </div>
                        <div className="col-md-2">
                            <SubmitButton name="Rechercher"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;