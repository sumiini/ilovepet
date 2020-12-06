import React from "react";
import axios from 'axios';

import Header from "../container/Header";
import Footer from "../container/Footer";

import '../css/signin.css'

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
                    <div className="signinmaster">
                    <h1>로그인</h1>

                    <form method="POST" action="http://localhost:3002/Signin">
                        
                        <h4>아이디</h4>
                        <input name="signinID" type="text"></input>
                        <p/>
                        <h4>비밀번호</h4>
                        <input name="signinPWD" type="password"></input>
                        <p/>
                        <input type="submit" value="로그인"></input>


                    </form>
                    <p/>
                    
                </div>
                }
                <Footer />
            </div>
        )
    }
}

export default Signin;