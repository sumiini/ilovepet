import React from "react";
import axios from 'axios';

import Header from "../container/Header";
import Center from "../container/Center";
import Footer from "../container/Footer";

class Main extends React.Component{
    constructor(props){
        super(props);

        this.state={

        };
    }

    render(){
        return(
            <div>
                <Header/>
                <Center/>
                    Main Page
                <Footer/>
            </div>
        )
    }

   

}

export default Main;