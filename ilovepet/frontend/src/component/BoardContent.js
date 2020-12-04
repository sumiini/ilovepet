import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';
import '../css/content.css'

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
                <div >
                    {contentboards.map(i=>
                    
                        {if(i._id===boardId){
                            
                            return(
                                <div className="freeboardcontent">
                                    <h4 className="boardtitle">제목</h4>
                                    <p/>
                                    <div className="tt" key={i._id}>{i.boardtitle}</div>

                                    <h4 className="boarduser">작성자</h4>
                                    <p/>
                                    <div className="us" key={i._id}>{i.boarduserid}</div>

                                    
                                    <h4 className="boardcontent">내용</h4>
                                    <p/>
                                    <div className="ct" key={i._id}>{i.boardcontent}</div>
                                    <p/>
                                    <div className="btn"><Link className="edibtn" to={`/editadmin${i._id}`}>수정</Link><Link className="delbtn" to={`/deladmin${i._id}`}>삭제</Link></div>
                                   
                                   
                                   <br/>
                                   
                                    
                                </div>
                            )    
                        }}
                        
                    )}
                    
                    <p/>
                    <h4 className="comm">댓글</h4>
                    <form method="POST" action="http://localhost:3002/Addcomment">
                        
                        <input className="controllid" type="text" name="commentid"></input>
                        <input className="controllpwd" type="password" name="commentpwd"></input>
                        <p/>
                        <input type="hidden" name="commentkey" value={boardId}/>
                        
                        <div className="commbtn"><input type="text" name="commentcontent"></input><button type="submit">댓글추가</button></div>

                    </form>

                    <p/>
                    <h4 className="commlist">댓글 리스트</h4>
                    <p/>
                    <div className="commlt">
                        {commentdata.map(m=>
                            {if(m.commentId===boardId){
                                    return(
                                        <div className="commlog">
                                            <div key={m._id}>{m.commentContent}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{m.commentUserid}&nbsp;&nbsp;&nbsp;<Link className="commdel" to={`/delcm${m.commentId}*${m._id}&`}> 댓글 삭제</Link></div>
                                    
                                        
                                        </div>
                                    
                                    

                                    
                                    )
                                

                                }

                            }
                        
                        )}

                    </div>
                   
                    
                </div>
                <Footer />
            </div>
        )
    }
}

export default BoardContent;