import React from 'react';
import axios from 'axios';

import SearchBar from '../../../../ReusableComponents/SearchBar';

class SearchAdherent extends React.Component{
    constructor(props){
        super(props);

        this.search = this.search.bind(this);
    }

    search(keywords){
        console.log(keywords);
    }

    render(){
        return(
            <div>
                <div>
                    <SearchBar onSearch={this.search}/>
                </div>
            </div>
        );
    }
}

export default SearchAdherent;