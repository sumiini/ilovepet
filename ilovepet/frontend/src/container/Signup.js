import React from "react";
import axios from 'axios';
import '../css/signup.css';

import Header from "../component/Header";
import Footer from "../component/Footer";

class Signup extends React.Component{
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
                    <div className="divsignup">
                        <h1>회원가입</h1>

                        <form method="POST" action="http://localhost:3002/Signup">
                            <label>닉네임</label>
                            <p/>
                            <input className="usernickname" name="usernickname" type="text" ></input>
                            <p/>
                            <label>아이디</label>
                            <p/>
                            <input className="userid" name="userid" type="text"></input>
                            <p/>
                            <label>비밀번호</label>
                            <p/>
                            <input className="userpassword" name="userpassword" type="password"></input>
                            <p/>
                            <input type="submit" value="회원가입"></input>


                        </form>
                        
                    </div>
                    

                    

                }
                <Footer />
            </div>
        )
    }
}

export default Signup;