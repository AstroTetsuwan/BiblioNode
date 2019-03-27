import React from 'react';

import './AutoCompleteResultsBox.css';

class AutoCompleteResultsBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style: {}
        }
    }

    componentDidMount(){

        let inputTarget = document.getElementById(this.props.inputTarget);
        let rect = inputTarget.getBoundingClientRect();
        this.setState({style: {
            maxHeight: rect.height * 5,
            maxWidth: rect.width,
            minWidth: rect.width,
            top: (rect.top + rect.height - 5),
            left: rect.left
        }});
    }

    render(){
        let options = this.props.options.map(
            (v, i) => <p id={"autoCompleteOption-" + i} key={i} onClick={() => this.props.handleClick}
                className={"autoComplete-option " + (i===this.props.selectedIndex ? "autoComplete-option-selected" :"")}
                onClick={this.props.handleClick}>{v.value}</p>
        );
  

        return(
            <div style={this.state.style} className={"autoComplete-wrapper " + (this.props.hidden ? "autoComplete-hidden" : "")}>
                {options}
            </div>
        );
    }
}

export default AutoCompleteResultsBox;