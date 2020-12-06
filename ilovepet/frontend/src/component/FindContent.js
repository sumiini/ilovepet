import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';
import '../css/findcontent.css'


class FindContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contentfindboards:[],
            findcommentdata:[],
        };
    }

    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readfindboard');
            console.log("loadingdata");

            const response2 = await axios.get('http://localhost:3002/Readfindcomment');
            console.log("loadingcommentdata");

            
            this.setState({
                contentfindboards:response.data,
                findcommentdata:response2.data,
            });
        }catch(e){
            console.log(e);
        }
    };

  

    componentDidMount() {
         const { loadingData } = this;
         loadingData();
         //loadingData();
    }

    render(){
        let findboardId = window.location.pathname.replace("/findcontent","");
        console.log("id이지롱"+findboardId);
        const{contentfindboards}=this.state;
        const {findcommentdata}=this.state;
        console.log(contentfindboards.map(i=>i.findboardtitle));
       // console.log(findcommentdata.map(n=>n.commentId));
        

        return(
            <div>
                <Header />
                <div className="findboardcontent">
                    <div className="fboard">
                        {contentfindboards.map(i=>
                    
                            {if(i._id===findboardId){
                        
                                return(
                                    <div className="findboardcontent">
                                        <h4 className="findboardtitle">제목</h4>
                                        <p/>
                                        <div className="findtt" key={i._id}>{i.findboardtitle}</div>
                                        <h4 className="findboarduser">작성자</h4>
                                        <p/>
                                        <div className="us" key={i._id}>{i.findboarduserid}</div>
                                        <p/>
                                        <h4 className="findboardplace">장소</h4>
                                        <p/>
                                        <div key={i._id}>{i.findboardplace}</div>
                                        <h4 className="findboardimg">사진</h4>
                                        <p/>
                                        <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                        <p/>
                                
                                        <h4 className="findboardcontent2">내용</h4>
                                        <p/>
                                        <div key={i._id}>{i.findboardcontent}</div>
                                
                                        <p/>
                                        <div className="findbtn"><Link className="edibtn" to={`/findeditadmin${i._id}`}>수정</Link><Link className="delbtn" to={`/finddeladmin${i._id}`}>삭제</Link></div>
                               
                                    <br/>
                               
                                
                                    </div>
                                )    
                            }}
                    
                        )}

                    </div>
                    
                    
                    <p/>
                    <h4 className="h4com">댓글</h4>
                    <div className="comminput">
                        {<form method="POST" action="http://localhost:3002/Addfindcomment">
                        
                            <input className="controllid" type="text" name="commentid"></input>
                            <input className="controllpwd" type="password" name="commentpwd"></input>
                            <p/>
                            <input type="text" name="commentcontent"></input>
                            <input type="hidden" name="commentkey" value={findboardId}/>
                            {console.log("idididid--"+findboardId)}

                            <button type="submit">댓글추가</button>

                        </form>}

                    </div>
                   
                    <p/>
                    <h4 className="comlist">댓글 리스트</h4>
                    <div className="comli">
                        {findcommentdata.map(m=>
                            {if(m.commentId===findboardId){
                                    return(
                                        <div className="comlog">
                                            
                                            <div key={m._id}>{m.commentContent}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{m.commentUserid}&nbsp;&nbsp;&nbsp;<Link className="commdel" to={`/delfindcm${m.commentId}*${m._id}&`}> 댓글 삭제</Link></div>

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

export default FindContent;