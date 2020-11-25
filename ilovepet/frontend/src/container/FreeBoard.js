import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Footer from "../component/Footer";

class FreeBoard extends React.Component{
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
                    <div>
                        <h1>자유게시판</h1>
                        <div className="freeboard-list">

                        </div>

                       <div>
                           <a href="./write">글쓰기</a>
                       </div>

                    </div>
                    
                }
                <Footer />
            </div>
        )
    }
}

export default FreeBoard;