import React, { Component } from 'react';

class DateInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChange(this.props.id, e.target.value);
    }

    render(){
        return(
            <div className={"form-group " + (this.props.col || "") }>
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <input type="date" name={this.props.id} className="form-control"
                id={this.props.id} value={this.props.value} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default DateInput;