import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Center from "../component/Center";
import Footer from "../component/Footer";

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