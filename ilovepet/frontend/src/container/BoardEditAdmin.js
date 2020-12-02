import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../component/Header";
import Footer from "../component/Footer";

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
                                <div>
                                    
                                    <span key={i._id}>{i.boarduserid}</span>

                                    <form method="POST" action="http://localhost:3002/Editboard">
                                        <input type="hidden" value={i._id} name="edid"></input>
                                        <h3>--------------------------------------</h3>

                                        <label>제목</label>
                                        <input type="text" placeholder={i.boardtitle} name="edittitle"/>
                                        <p/>
                                        <h3>--------------------------------------</h3>
                                        <label>내용</label>
                                        <input type="text" placeholder={i.boardcontent} name="editcontent"/>
                                        <p/>
                                        <h3>--------------------------------------</h3>
                                        <labe>id</labe>
                                        <input type="text" name="editid"></input>
                                        <p/>
                                        <h3>--------------------------------------</h3>
                                        <label>password</label>
                                        <input type="password" name="editpwd"></input>
                                        <p/>

                                        <input type="hidden" value={i.boardtitle} name="beforetitle"/>
                                        <input type="hidden" value={i.boardcontent} name="beforecontent"/>

                                        <input type="hidden" value={i.boarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.boarduserpsw} name="bdpwd"></input>
                                        <button type="submit">수정하기</button>
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

export default BoardEditAdmin;