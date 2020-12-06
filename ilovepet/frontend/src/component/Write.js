import React from "react";
import axios from 'axios';

import Header from "../container/Header";
import Center from "../container/Center";
import Footer from "../container/Footer";

import '../css/center.css';
import '../css/controll.css';

class Write extends React.Component{
    constructor(props){
        super(props);

        this.state={

        };
    }
    
    render(){
        
        return(
            <div>
                <Header/>
                    <div className="write-action">
                        <h2>게시글 작성</h2>
                        <h4>*게시물은 등록된 사용자만이 작성할 수 있습니다.*</h4>
                        <form method="POST" action="http://localhost:3002/Createboard">
                            
                            <input className="controllid" type="text" placeholder="아이디" name="userid" required/>
                            <p/>

                            <input className="controllpwd" type="password" placeholder="비밀번호" name="userpsw" required/>
                            <p/>

                            <label className="title"><strong>제목</strong></label>
                            <p/>
                            <input type="text" placeholder="제목" name="title" required/>
                            <p/>

                            <label className="content"><strong>내용</strong></label>
                            <p/>
                            <textarea className="txtarea"  name="content" placeholder="내용을 입력하세요."></textarea>
                            <p/>

                            <input type="submit" value="글쓰기"></input>
                            



                        </form>
                        <p/>

                    </div>
                <Footer/>
            </div>
        )
    }

   

}

export default Write;