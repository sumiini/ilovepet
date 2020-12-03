import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";

class BoardContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contentboards:[],
            commentdata:[],
        };
    }

    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readboard');
            console.log("loadingdata");

            const response2 = await axios.get('http://localhost:3002/Readcomment');
            console.log("loadingcommentdata");

            
            this.setState({
                contentboards:response.data,
                commentdata:response2.data,
            });
        }catch(e){
            console.log(e);
        }
    };

  

    componentDidMount() {
         const { loadingData } = this;
         //loadingData();
         loadingData();
    }

    render(){
        let boardId = window.location.pathname.replace("/boardcontent","");
        console.log("id이지롱"+boardId);
        const{contentboards}=this.state;
        const {commentdata}=this.state;
        console.log(contentboards.map(i=>i.boardtitle));
        console.log(commentdata.map(n=>n.commentId));
        

        return(
            <div>
                <Header />
                <div className="boardcontent">
                    {contentboards.map(i=>
                    
                        {if(i._id===boardId){
                            
                            return(
                                <div>
                                    <h4>[ 작성자 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.boarduserid}</span>

                                    <h4>[ 제목 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.boardtitle}</span>
                                    <h4>[ 내용 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.boardcontent}</span>
                                    <p/>
                                   <Link to={`/deladmin${i._id}`}>삭제</Link>
                                   <br/>
                                   <Link to={`/editadmin${i._id}`}>수정</Link>
                                    
                                </div>
                            )    
                        }}
                        
                    )}
                    
                    <p/>
                    <div>댓글</div>
                    <form method="POST" action="http://localhost:3002/Addcomment">
                        <labe>id</labe>
                        <input type="text" name="commentid"></input>
                        <p/>
                        <label>password</label>
                        <input type="password" name="commentpwd"></input>
                        <p/>
                        <label>댓글내용</label>
                        <input type="text" name="commentcontent"></input>
                        <input type="hidden" name="commentkey" value={boardId}/>
                        {console.log("idididid--"+boardId)}

                        <button type="submit">댓글추가</button>

                    </form>

                    <div>댓글 리스트</div>
                    {commentdata.map(m=>
                        {if(m.commentId===boardId){
                                return(
                                    <div>
                                        <div key={m._id}>{m.commentContent}</div>
                                        <div key={m._id}>{m.commentUserid}</div>
                                        <Link to={`/delcm${m.commentId}*${m._id}&`}> 댓글 삭제</Link>
                                    </div>
                                    
                                    

                                    
                                )
                                

                            }

                        }
                        
                    )}
                    
                </div>
                <Footer />
            </div>
        )
    }
}

export default BoardContent;