import React from 'react';


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {searchVal: ""};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(){
        this.props.onSearch(this.state.searchVal);
    }

    handleChange(e){
        this.setState({searchVal: e.target.value})
    }
    
    render(){
        return (
            <div className="form-group">
                <div className="col-md-10">
                    <input type="text" className="form-control" onChange={this.handleChange} value={this.state.searchVal} id="search-bar" placeholder="Rechercher par nom ou pseudo"/>
                </div>
                <div className="col-md-2">
                    <button type="button" className="btn btn-primary"onClick={this.handleClick}>Rechercher</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;