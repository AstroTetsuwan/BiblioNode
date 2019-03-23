import React from 'react';
import { Link } from 'react-router-dom';

import DropDownElement from './DropDownElement';

import './DropDownSection.css';

class DropDownSection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topElement: {
                name: this.props.top.name, 
                link: this.props.top.link || false
            } ,
            dropDownElements: (this.props.dropDownElements) ? this.props.dropDownElements.map((dde, i) => <DropDownElement key={i} link={dde.link} name={dde.name} />) : false
        };

        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver(){
        this.showSubElements(true);
    }

    handleMouseOut(){
        this.showSubElements(false);
    }

    showSubElements(show){
        let dropdown = document.getElementById("drop-down-" + this.props.top.name);
        if(dropdown !== null){
            dropdown.classList.remove("drop-down-sub-list-" + (show ? "hidden" : "visible"));
            dropdown.classList.add("drop-down-sub-list-" + (show ? "visible" : "hidden"));
        }
    }

    render(){
        return(
            <li onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} className="drop-down-section">
                {this.state.topElement.link && <Link to={this.state.topElement.link}>{this.state.topElement.name}</Link> }
                {!this.state.topElement.link &&  <span>{this.state.topElement.name}</span> }
                {this.state.dropDownElements &&
                    <ul id={"drop-down-" + this.props.top.name} className="drop-down-sub-list-hidden">
                        {this.state.dropDownElements}
                    </ul>
                }
            </li>
        );
    }
}

export default DropDownSection;
