import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';
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
                    {contentprotectboards.map(i=>
                    
                        {if(i._id===protectboardId){
                            
                            return(
                                <div>
                                    <h4>[ 작성자 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.protectboarduserid}</span>

                                    <h4>[ 제목 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.protectboardtitle}</span>
                                    <h4>[ 내용 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.protectboardcontent}</span>
                                    <p/>
                                    <h4>[ 장소 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.protectboardplace}</span>
                                    <h4>[ 사진 ]</h4>
                                    <p/>
                                    <img width="200px" key={i._id} src={"/images/"+i.protectboardimg}></img>
                                    <p/>
                                    <p/>
                                   <Link to={`/protecteditadmin${i._id}`}>수정</Link>
                                   <br/>
                                   <Link to={`/protectdeladmin${i._id}`}>삭제</Link>
                                    
                                </div>
                            )    
                        }}
                        
                    )}
                    
                    <p/>
                    <div>댓글</div>
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

                    <div>댓글 리스트</div>
                    {protectcommentdata.map(m=>
                        {if(m.commentId===protectboardId){
                                return(
                                    <div>
                                        <div key={m._id}>{m.commentContent}</div>
                                        <div key={m._id}>{m.commentUserid}</div>
                                        <Link to={`/delprotectcm${m.commentId}*${m._id}&`}> 댓글 삭제</Link>
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

export default ProtectContent;