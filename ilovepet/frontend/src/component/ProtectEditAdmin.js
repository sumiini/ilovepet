import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';
class ProtectEditAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editfindboards:[],
        };
    }
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readprotectboard');
            console.log("hi");
            this.setState({
                editfindboards:response.data,
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
        let protectboardEditId = window.location.pathname.replace("/protecteditadmin","");
        console.log(protectboardEditId);
        const{editfindboards}=this.state;
        //console.log(editboards.map(i=>i.boardtitle));

        return(
            <div>
                <Header />
                <div>
                    {editfindboards.map(i=>
                    
                        {if(i._id===protectboardEditId){
                            return(
                                <div className="all">
                                    <h4>작성자</h4>
                                    <p/>
                                    <span key={i._id}>{i.protectboarduserid}</span>
                                    <form method="POST" action="http://localhost:3002/Editprotectboard">
                                        
                                        <input className="controllid" type="text" name="editid"></input>
                                        <input className="controllpwd" type="password" name="editpwd"></input>
                                        
                                        <input type="hidden" value={i._id} name="edid"></input>
                                        <h4 className="titlename">제목</h4>
                                        <p/>
                                        <input type="text" placeholder={i.protectboardtitle} name="edittitle"/>
                                        <p/>
                                        <h4 className="fcontentplace">장소</h4>
                                        <p/>
                                        <input type="text" placeholder={i.protectboardplace} name="editplace"/>
                                        <p/>
                                        <h4 className="fcontentimg">이미지</h4>
                                        <p/>
                                        <img width="200px" key={i._id} src={"/images/"+i.protectboardimg}></img>
                                        <h4 className="contentname">내용</h4>
                                        <p/>
                                        <textarea className="txtarea" type="text" placeholder={i.protectboardcontent} name="editcontent"/>
                                        <p/>
                                        
                                        
                                        <p/>
                                        <input type="hidden" value={i.protectboardtitle} name="beforetitle"/>
                                        <input type="hidden" value={i.protectboardcontent} name="beforecontent"/>
                                        <input type="hidden" value={i.protectboardplace} name="beforeplace"/>
                                        <input type="hidden" value={i.protectboardimg} name="beforeimg"/>

                                        <input type="hidden" value={i.protectboarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.protectboarduserpsw} name="bdpwd"></input>
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

export default ProtectEditAdmin;