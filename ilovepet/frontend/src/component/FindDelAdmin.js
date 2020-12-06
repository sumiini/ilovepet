import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';
import '../css/boardadmin.css'
class FindDelAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            adminboards:[],
        };
    }
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readfindboard');
            console.log("hi");
            this.setState({
                adminboards:response.data,
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
        let boardAdminId = window.location.pathname.replace("/finddeladmin","");
        console.log(boardAdminId);
        const{adminboards}=this.state;
        return(
            <div>
                <Header />
                <div>
                    {adminboards.map(i=>
                        {if(i._id===boardAdminId){
                            return(
                                <div className="con">
                                    <h4 className="user">작성자</h4>
                                   
                                    <span key={i._id}>{i.findboarduserid}</span>
                                    <p/>
                                    <h4 className="titlename">제목</h4>
                                    
                                    <span key={i._id}>{i.findboardtitle}</span>
                                    <p/>
                                    
                                   
                                    <h4 className="fcontentplace">장소</h4>
                                    
                                    <span key={i._id}>{i.findboardplace}</span>
                                    <p/>
                                    <h4 className="fcontentimg">이미지</h4>
                                    
                                    <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                    <p/>
                                    <h4 className="contentname">내용</h4>
                                   
                                    <span key={i._id}>{i.findboardcontent}</span>
                                    <p/>
                                    <form method="POST" action="http://localhost:3002/Deletefindboard">
                                        
                                        <input className="controllid" type="text" name="adminid"></input>
                                        <input className="controllpwd" type="password" name="adminpwd"></input>

                                        <input type="hidden" value={i._id} name="delid"></input>
                                        <p/>
                                        <input type="hidden" value={i.findboarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.findboarduserpsw} name="bdpwd"></input>
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

export default FindDelAdmin;