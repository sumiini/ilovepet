import React from "react";
import axios from 'axios';
import '../css/signup.css';

import Header from "../container/Header";
import Footer from "../container/Footer";

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usernickname:"",
            userid:"",
            userpassword:""
            
        };
    }

    

    render(){
        

        

        return(
            <div>
                <Header />
                <div className="divsignup">
                        <h1>회원가입</h1>


                        <form method="POST" action="http://localhost:3002/Signup">
                            
                            <h4>아이디</h4>
                            <p/>
                            <input className="userid" name="userid" type="text"></input>
                            <p/>
                            <h4>비밀번호</h4>
                            <p/>
                            <input className="userpassword" name="userpassword" type="password"></input>
                            <p/>
                            <input type="submit" value="회원가입"></input>


                        </form>
                        <p/>
                        
                    </div>

                

                    
                 
                <Footer />
            </div>
        )
    }
}

export default Signup;