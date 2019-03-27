import React, { Component } from 'react';

class TextInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        if(this.props.focus)
            document.getElementById(this.props.id).focus();
    }

    handleChange(e){
        this.props.onChange(this.props.id, e.target.value);
    }

    render(){
        return(
            <div className={"form-group " + (this.props.col || "") }>
                
                {this.props.label && <label htmlFor={this.props.id}>{this.props.name}</label>}
                
                <input type={this.props.type} name={this.props.id} className="form-control" required={this.props.required} maxLength={this.props.maxLength || ""}
                id={this.props.id} placeholder={this.props.placeholder || this.props.name} value={this.props.value} onChange={this.handleChange}/>

            </div>
        );
    }
}

export default TextInput;