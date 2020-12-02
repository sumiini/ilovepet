import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../component/Header";
import Footer from "../component/Footer";

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
                                <div>
                                

                                    <label>[ 제목 ]</label>
                                    <p/>
                                    <span key={i._id}>{i.boardtitle}</span>
                                    <p/>
                                    <h3>--------------------------------------</h3>
                                    <label>[ 내용 ]</label>
                                    <p/>
                                    <span key={i._id}>{i.boardcontent}</span>
                                    <p/>
                                    <h3>--------------------------------------</h3>
                                    <label>[ 작성자 ]</label>
                                    <p/>
                                    <span key={i._id}>{i.boarduserid}</span>
                                    <p/>
                                    <h3>--------------------------------------</h3>
                                    <form method="POST" action="http://localhost:3002/Deleteboard">
                                        <input type="hidden" value={i._id} name="delid"></input>
                                        <labe>id</labe>
                                        <input type="text" name="adminid"></input>
                                        <p/>
                                        <label>password</label>
                                        <input type="password" name="adminpwd"></input>
                                        <p/>
                                        <input type="hidden" value={i.boarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.boarduserpsw} name="bdpwd"></input>
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

export default BoardDelAdmin;