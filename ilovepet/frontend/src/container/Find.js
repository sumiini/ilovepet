import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Footer from "../component/Footer";

class Find extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <div>
                <Header />
                
                
                    <h1>찾아주세요</h1>
                
                <Footer />
            </div>
        )
    }
}

export default Find;