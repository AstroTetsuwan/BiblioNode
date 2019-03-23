import React from 'react';

class SelectInput extends React.Component{
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChange(this.props.id, e.target.value);
    }

    render(){
        let options = this.props.options.map((optVal,i) => <option key={i}>{optVal}</option>);

        return(
            <div className={"form-group " + (this.props.col || "") }>
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <select name={this.props.id} id={this.props.id} className="form-control" value={this.props.value} onChange={this.handleChange}>
                    {options}
                </select>
            </div>
        );
    }
}

export default SelectInput;