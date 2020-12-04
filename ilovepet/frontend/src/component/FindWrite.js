import React from "react";
import axios from 'axios';

import Header from "../container/Header";
import Center from "../container/Center";
import Footer from "../container/Footer";
import '../css/controll.css';

class FindWrite extends React.Component{
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
                        <h2>[ 찾아주세요 ] 게시글 작성</h2>
                        <h4>*게시물은 등록된 사용자만이 작성할 수 있습니다.*</h4>
                        <form method="POST" action="http://localhost:3002/Createfindboard">
                            
                            
                            <input className="controllid" type="text" placeholder="아이디" name="userid" required/>
                            <input className="controllpwd" type="password" placeholder="비밀번호" name="userpsw" required/>
                            <p/>

                            
                            <p/>

                            
                            <label className="title"><strong>제목</strong></label>
                            <input type="text" placeholder="제목" name="title" required/>
                            <p/>

                            <label>장소</label>
                            <input placeholder="장소" type="text" name="place"></input>
                            <p/>
                            <label>이미지</label>
                            <input type="file" name="imgfile"></input>
                            <p/>

                            <label className="content"><strong>내용</strong></label>
                            <textarea name="content" placeholder="내용을 입력하세요."></textarea>
                            <p/>

                            <input type="submit" value="글쓰기"></input>
                            



                        </form>
                    </div>
                <Footer/>
            </div>
        )
    }

   

}

export default FindWrite;