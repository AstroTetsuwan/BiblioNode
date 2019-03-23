import React, { Component } from 'react';

class TextField extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        let textFieldValue = e.target.value;
        this.props.onChange(this.props.id, textFieldValue);
    }

    render(){
        return(
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <input type={this.props.type} name={this.props.id} className="form-control" required={this.props.required}
                id={this.props.id} placeholder={this.props.name} value={this.props.value} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default TextField;