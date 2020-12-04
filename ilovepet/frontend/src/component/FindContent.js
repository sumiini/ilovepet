import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';

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
                <div className="boardcontent">
                    {contentfindboards.map(i=>
                    
                        {if(i._id===findboardId){
                            
                            return(
                                <div>
                                    <h4>[ 작성자 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.findboarduserid}</span>

                                    <h4>[ 제목 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.findboardtitle}</span>
                                    <h4>[ 내용 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.findboardcontent}</span>
                                    <p/>
                                    <h4>[ 장소 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.findboardplace}</span>
                                    <h4>[ 사진 ]</h4>
                                    <p/>
                                    <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                    <p/>
                                    <p/>
                                   <Link to={`/findeditadmin${i._id}`}>수정</Link>
                                   <br/>
                                   <Link to={`/finddeladmin${i._id}`}>삭제</Link>
                                    
                                </div>
                            )    
                        }}
                        
                    )}
                    
                    <p/>
                    <div>댓글</div>
                    {<form method="POST" action="http://localhost:3002/Addfindcomment">
                        
                        <input className="controllid" type="text" name="commentid"></input>
                        <input className="controllpwd" type="password" name="commentpwd"></input>
                        <p/>
                        <label>댓글내용</label>
                        <input type="text" name="commentcontent"></input>
                        <input type="hidden" name="commentkey" value={findboardId}/>
                        {console.log("idididid--"+findboardId)}

                        <button type="submit">댓글추가</button>

                    </form>}

                    <div>댓글 리스트</div>
                    {findcommentdata.map(m=>
                        {if(m.commentId===findboardId){
                                return(
                                    <div>
                                        <div key={m._id}>{m.commentContent}</div>
                                        <div key={m._id}>{m.commentUserid}</div>
                                        <Link to={`/delfindcm${m.commentId}*${m._id}&`}> 댓글 삭제</Link>
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

export default FindContent;