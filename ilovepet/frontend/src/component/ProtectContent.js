import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';
import '../css/protectcontent.css'
class ProtectContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contentprotectboards:[],
            protectcommentdata:[],
        };
    }

    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readprotectboard');
            console.log("loadingdata");

            const response2 = await axios.get('http://localhost:3002/Readprotectcomment');
            console.log("loadingcommentdata");

            
            this.setState({
                contentprotectboards:response.data,
                protectcommentdata:response2.data,
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
        let protectboardId = window.location.pathname.replace("/protectcontent","");
        console.log("id이지롱"+protectboardId);
        const{contentprotectboards}=this.state;
        const {protectcommentdata}=this.state;
        console.log(contentprotectboards.map(i=>i.protectboardtitle));
       // console.log(protectcommentdata.map(n=>n.commentId));
        

        return(
            <div>
                <Header />
                <div className="boardcontent">
                    <div className="pboard">
                        {contentprotectboards.map(i=>
                    
                            {if(i._id===protectboardId){
                        
                                return(
                                    <div className="protectboardcontent">
                                        <h4 className="protectboardtitle">제목</h4>
                                        <p/>
                                        <div className="protecttt" key={i._id}>{i.protectboardtitle}</div>
                                        <p/>
                                        <h4 className="protectboarduser">작성자</h4>
                                        <p/>
                                        <div className="protectus" key={i._id}>{i.protectboarduserid}</div>
                                        <p/>
                                        <h4 className="protectboardplace">장소</h4>
                                        <p/>
                                        <div key={i._id}>{i.protectboardplace}</div>
                                        <p/>
                                        <h4 className="protectboardimg">사진</h4>
                                        <p/>
                                        <img width="200px" key={i._id} src={"/images/"+i.protectboardimg}></img>
                                        <p/>
                                        <h4 className="protectboardcontent2">내용</h4>
                                        <p/>
                                        <div key={i._id}>{i.protectboardcontent}</div>
                               
                                
                                        <p/>
                                        <div className="protectbtn"><Link className="edibtn" to={`/protecteditadmin${i._id}`}>수정</Link><Link className="delbtn" to={`/protectdeladmin${i._id}`}>삭제</Link></div>

                                
                                    </div>
                                )    
                            }}
                    
                        )}  

                    </div>
                    
                    
                    <p/>
                    <div className="h4com">댓글</div>
                    <div className="comminput">
                        {<form method="POST" action="http://localhost:3002/Addprotectcomment">
                            <input className="controllid" type="text" name="commentid"></input>
                            <input className="controllpwd" type="password" name="commentpwd"></input>
                            <p/>
                            <label>댓글내용</label>
                            <input type="text" name="commentcontent"></input>
                            <input type="hidden" name="commentkey" value={protectboardId}/>
                            {console.log("idididid--"+protectboardId)}

                            <button type="submit">댓글추가</button>

                        </form>}

                    </div>
                    

                    <h4 className="comlist">댓글 리스트</h4>
                    <div className="comli">
                        {protectcommentdata.map(m=>
                            {if(m.commentId===protectboardId){
                                    return(
                                        <div className="comlog">
                                            <div key={m._id}>{m.commentContent}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{m.commentUserid}&nbsp;&nbsp;&nbsp;<Link className="commdel" to={`/delprotectcm${m.commentId}*${m._id}&`}> 댓글 삭제</Link></div>
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

export default ProtectContent;