import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';
import '../css/boardadmin.css';

class BoardDelAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            adminboards:[],
        };
    }
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readboard');
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
        let boardAdminId = window.location.pathname.replace("/deladmin","");
        console.log(boardAdminId);
        const{adminboards}=this.state;
        console.log(adminboards.map(i=>i.boardtitle));
        return(
            <div>
                <Header />
                <div>
                    {adminboards.map(i=>
                        {if(i._id===boardAdminId){
                            return(
                                <div className="delcontent">
                                    <h4 className="titlename">제목</h4>
                                    <p/>
                                    <span key={i._id}>{i.boardtitle}</span>
                                    <p/>
                                    <h4 className="contentname">내용</h4>
                                    <p/>
                                    <span key={i._id}>{i.boardcontent}</span>
                                    <p/>
                                    <h4 className="user">작성자</h4>
                                    <p/>
                                    <span key={i._id}>{i.boarduserid}</span>
                                    <p/>
                                    <form method="POST" action="http://localhost:3002/Deleteboard">
                                        <input type="hidden" value={i._id} name="delid"></input>
                                        
                                        <input className="controllid" type="text" name="adminid"></input>
                                        <input className="controllpwd" type="password" name="adminpwd"></input>
                                        <p/>
                                        <input type="hidden" value={i.boarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.boarduserpsw} name="bdpwd"></input>
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

export default BoardDelAdmin;