import React from 'react';

function ResultsPagination(props){
    let buttons = [];
    for(let i=0; i < props.nbrButtons; i++){
        buttons.push(
            (props.currentPage === i+1) ? 
            <button type="button" className={"btn btn-secondary disabled"} key={i} style={{marginRight:"10px"}}>{i+1}</button> : 
            <button type="button" className={"btn btn-primary"} id={"page-" + (i+1)} key={i} style={{marginRight:"10px"}} 
                onClick={() => { props.handleClick(i+1); }}>{i+1}</button>
        );
    }
    return(
        <div style={{margin:"10px"}}>
            {buttons}
        </div>
    );
}

export default ResultsPagination;