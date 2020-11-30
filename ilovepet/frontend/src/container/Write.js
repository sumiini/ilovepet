import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Center from "../component/Center";
import Footer from "../component/Footer";

import '../css/center.css';

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
                            
                            <label className="userid"><strong>ID</strong></label>
                            <input type="text" placeholder="아이디" name="userid" required/>
                            <p/>

                            <label className="userpsw"><strong>Password</strong></label>
                            <input type="password" placeholder="비밀번호" name="userpsw" required/>
                            <p/>

                            <label className="title"><strong>제목</strong></label>
                            <input type="text" placeholder="제목" name="title" required/>
                            <p/>

                            <label className="content"><strong>내용</strong></label>
                            <input  type="textarea" name="content" placeholder="내용을 입력하세요."></input>
                            <p/>

                            <input type="submit" value="글쓰기"></input>
                            



                        </form>
                    </div>
                <Footer/>
            </div>
        )
    }

   

}

export default Write;