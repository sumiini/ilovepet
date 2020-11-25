import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Footer from "../component/Footer";

class Protect extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <div>
                <Header />
                
                {
                    <h1>보호중이에요</h1>
                }
                <Footer />
            </div>
        )
    }
}

export default Protect;