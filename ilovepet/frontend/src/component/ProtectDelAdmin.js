import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";

class ProtectDelAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            adminboards:[],
        };
    }
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readprotectboard');
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
         //loadingData();
         loadingData();
    }
    render(){
        let boardAdminId = window.location.pathname.replace("/protectdeladmin","");
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
                                   
                                   <span key={i._id}>{i.protectboarduserid}</span>
                                   <p/>
                                    <h4 className="titlename">제목</h4>
                                    
                                    <span key={i._id}>{i.protectboardtitle}</span>
                                    <p/>
                                    <h4 className="fcontentplace">장소</h4>
                                    
                                    <span key={i._id}>{i.protectboardplace}</span>
                                    <p/>
                                    <h4 className="fcontentimg">이미지</h4>
                                    
                                    <img width="200px" key={i._id} src={"/images/"+i.protectboardimg}></img>
                                    <p/>
                                    <h4 className="contentname">내용</h4>
                                   
                                    <span key={i._id}>{i.protectboardcontent}</span>
                                    
                                    
                                    <p/>
                                    <form method="POST" action="http://localhost:3002/Deleteprotectboard">
                                        <input className="controllid" type="text" name="adminid"></input>
                                        <input className="controllpwd" type="password" name="adminpwd"></input>

                                        <input type="hidden" value={i._id} name="delid"></input>
                                        
                                        <input type="hidden" value={i.protectboarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.protectboarduserpsw} name="bdpwd"></input>
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

export default ProtectDelAdmin;