import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Center from "../component/Center";
import Footer from "../component/Footer";


class ProtectWrite extends React.Component{
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
                        <h2>[ 보호중이에요 ] 게시글 작성</h2>
                        <h4>*게시물은 등록된 사용자만이 작성할 수 있습니다.*</h4>
                        <form method="POST" action="http://localhost:3002/Createprotectboard">
                            
                            <label className="userid"><strong>ID</strong></label>
                            <input type="text" placeholder="아이디" name="userid" required/>
                            <p/>

                            <label className="userpsw"><strong>Password</strong></label>
                            <input type="password" placeholder="비밀번호" name="userpsw" required/>
                            <p/>

                            <label>장소</label>
                            <input type="text" name="place"></input>
                            <p/>

                            <label>이미지</label>
                            <input type="file" name="imgfile"></input>
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

export default ProtectWrite;