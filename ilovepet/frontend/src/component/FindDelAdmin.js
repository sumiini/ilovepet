import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";

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
                                <div>
                                    <label>[ 제목 ]</label>
                                    
                                    <span key={i._id}>{i.findboardtitle}</span>
                                    <p/>
                                    <h3>--------------------------------------</h3>
                                    <label>[ 내용 ]</label>
                                   
                                    <span key={i._id}>{i.findboardcontent}</span>
                                    <p/>
                                    <h3>--------------------------------------</h3>
                                    <label>[ 작성자 ]</label>
                                   
                                    <span key={i._id}>{i.findboarduserid}</span>
                                    <p/>
                                    <label>[ 장소 ]</label>
                                    
                                    <span key={i._id}>{i.findboardplace}</span>
                                    <p/>
                                    <label>[ 이미지 ]</label>
                                    
                                    <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                    <p/>
                                    <h3>--------------------------------------</h3>
                                    <form method="POST" action="http://localhost:3002/Deletefindboard">
                                        <input type="hidden" value={i._id} name="delid"></input>
                                        <labe>id</labe>
                                        <input type="text" name="adminid"></input>
                                        <p/>
                                        <label>password</label>
                                        <input type="password" name="adminpwd"></input>
                                        <p/>
                                        <input type="hidden" value={i.findboarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.findboarduserpsw} name="bdpwd"></input>
                                        <button type="submit">삭제하기</button>
                                    </form>
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