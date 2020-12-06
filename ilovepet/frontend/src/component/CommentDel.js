import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';


class CommentDel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            commentdata:[],
        };
    }

    loadingData=async()=>{
        try{

            const response2 = await axios.get('http://localhost:3002/Readcomment');
            console.log("loadingcommentdata");

            
            this.setState({
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
        let start = window.location.pathname.indexOf('*');
        let end = window.location.pathname.indexOf('&',start+1);

        let cmid = window.location.pathname.substring(start+1,end);
        console.log("cmid==="+cmid);
        console.log(start,end);

        let comid = window.location.pathname.replace(cmid,"");
        let comid2 = comid.replace("/delcm","");
        let comid3=comid2.replace("*&","");
        
        console.log("comid==="+comid3);
        //console.log("id이지롱"+boardCmId);

        const {commentdata}=this.state;
        console.log(commentdata.map(n=>n.commentId));

        return(
            <div>
                <Header />
                <div>
                    {commentdata.map(i=>
                        {if(i._id===cmid){
                            return(
                                <div className="all">
                                    
                                    <h4 className="user">작성자</h4>
                                    <p/>
                                    <span key={i._id}>{i.commentUserid} </span>
                                    <p/>
                                    <h4 className="cocontent">댓글내용</h4>
                                    <p/>
                                    <span key={i._id}>{i.commentContent} </span>
                                    
                                    <form method="POST" action="http://localhost:3002/Deletecomment">
                                        <input className="controllid" type="text" name="delcmid"></input>
                                        <input className="controllpwd" type="password" name="delcmpwd"></input>
                                        <input type="hidden" value={i._id} name="delcm"></input>

                                        
                                        <p/>
                                        <input type="hidden" value={i.commentId} name="interid"/>
                                        <input type="hidden" value={i.commentUserid} name="cmdbuserid"/>
                                        <input type="hidden" value={i.commentUserpwd} name="cmdbpwd"></input>
                                        <button type="submit">삭제하기</button>
                                    </form>
                                    <p/>
                                </div>
                            )
                        }}
                    )}
                </div>
                <Footer />
            </div>
        )
    }
}

export default CommentDel;