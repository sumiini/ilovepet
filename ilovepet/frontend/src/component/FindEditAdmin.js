import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";
import '../css/controll.css';


class FindEditAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editfindboards:[],
        };
    }
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readfindboard');
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
        let findboardEditId = window.location.pathname.replace("/findeditadmin","");
        console.log(findboardEditId);
        const{editfindboards}=this.state;
        //console.log(editboards.map(i=>i.boardtitle));

        return(
            <div>
                <Header />
                <div>
                    {editfindboards.map(i=>
                    
                        {if(i._id===findboardEditId){
                            return(
                                <div className="all">
                                    <h4 className="user">작성자</h4>
                                    <p/>
                                    {i.findboarduserid}
                                    <p/>
                                    <span key={i._id}>{i.boarduserid}</span>
                                    <form method="POST" action="http://localhost:3002/Editfindboard">

                                        <input className="controllid" type="text" name="editid"></input>
                                        <input className="controllpwd" type="password" name="editpwd"></input>

                                        <input type="hidden" value={i._id} name="edid"></input>
                                        <h4 className="titlename">제목</h4>
                                        <p/>
                                        <input type="text" placeholder={i.findboardtitle} name="edittitle"/>
                                        <p/>
                                        <h4 className="fcontentplace">장소</h4>
                                        <p/>
                                        <input type="text" placeholder={i.findboardplace} name="editplace"/>
                                        <p/>
                                        <h4 className="fcontentimg">이미지</h4>
                                        <p/>
                                        <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                        
                                        <p/>
                                        <h4 className="contentname">내용</h4>
                                        <p/>
                                        <input type="text" placeholder={i.findboardcontent} name="editcontent"/>
                                        <p/>
                                        
                                        
                                        <input type="hidden" value={i.findboardtitle} name="beforetitle"/>
                                        <input type="hidden" value={i.findboardcontent} name="beforecontent"/>
                                        <input type="hidden" value={i.findboardplace} name="beforeplace"/>
                                        <input type="hidden" value={i.findboardimg} name="beforeimg"/>

                                        <input type="hidden" value={i.findboarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.findboarduserpsw} name="bdpwd"></input>
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

export default FindEditAdmin;