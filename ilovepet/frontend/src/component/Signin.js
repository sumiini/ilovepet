import React from "react";
import axios from 'axios';

import Header from "../container/Header";
import Footer from "../container/Footer";

class Signin extends React.Component{
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
                    <h1>로그인창</h1>

                    <form method="POST" action="http://localhost:3002/Signin">
                        
                        <label>아이디</label>
                        <input name="signinID" type="text"></input>
                        <p/>
                        <label>비밀번호</label>
                        <input name="signinPWD" type="password"></input>
                        <p/>
                        <input type="submit" value="로그인"></input>


                    </form>
                    
                </div>
                }
                <Footer />
            </div>
        )
    }
}

export default Signin;