import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";

import '../css/controll.css';
import '../css/boardadmin.css'

class BoardEditAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editboards:[],
        };
    }
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readboard');
            console.log("hi");
            this.setState({
                editboards:response.data,
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
        let boardEditId = window.location.pathname.replace("/editadmin","");
        console.log(boardEditId);
        const{editboards}=this.state;
        console.log(editboards.map(i=>i.boardtitle));

        return(
            <div>
                <Header />
                <div>
                    {editboards.map(i=>
                    
                        {if(i._id===boardEditId){
                            return(
                                <div className="all">
                                    <h4 className="user">작성자</h4>
                                    <p/>
                                    <span className="userinfo" key={i._id}>{i.boarduserid}</span>
                                    <form method="POST" action="http://localhost:3002/Editboard">
                                        <input type="hidden" value={i._id} name="edid"></input>
                                        
                                        <input className="controllid" type="text" name="editid"></input>
                                        <input className="controllpwd" type="password" name="editpwd"></input>
                                        <p/>
                                        <h4 className="titlename">제목</h4>
                                        <input type="text" placeholder={i.boardtitle} name="edittitle"/>
                                        <p/>
                                        <h4 className="contentname">내용</h4>
                                        <input type="text" placeholder={i.boardcontent} name="editcontent"/>
                                        <p/>
                                        <input type="hidden" value={i.boardtitle} name="beforetitle"/>
                                        <input type="hidden" value={i.boardcontent} name="beforecontent"/>

                                        <input type="hidden" value={i.boarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.boarduserpsw} name="bdpwd"></input>
                                        <button type="submit">수정하기</button>
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

export default BoardEditAdmin;