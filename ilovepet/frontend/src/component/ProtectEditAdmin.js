import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../container/Header";
import Footer from "../container/Footer";

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
                                <div>
                                    <label>[ 작성자 ]</label>
                                    <p/>
                                    <span key={i._id}>{i.boarduserid}</span>
                                    <form method="POST" action="http://localhost:3002/Editprotectboard">
                                        <input type="hidden" value={i._id} name="edid"></input>
                                        <h3>--------------------------------------</h3>
                                        <label>[제목]</label>
                                        <input type="text" placeholder={i.protectboardtitle} name="edittitle"/>
                                        <label>[내용]</label>
                                        <input type="text" placeholder={i.protectboardcontent} name="editcontent"/>
                                        <label>[장소]</label>
                                        <input type="text" placeholder={i.protectboardplace} name="editplace"/>
                                        <label>[이미지]</label>
                                        <img width="200px" key={i._id} src={"/images/"+i.protectboardimg}></img>
                                        <label>id</label>
                                        <input type="text" name="editid"></input>
                                        <h3>--------------------------------------</h3>
                                        <label>password</label>
                                        <input type="password" name="editpwd"></input>
                                        <p/>
                                        <input type="hidden" value={i.protectboardtitle} name="beforetitle"/>
                                        <input type="hidden" value={i.protectboardcontent} name="beforecontent"/>
                                        <input type="hidden" value={i.protectboardplace} name="beforeplace"/>
                                        <input type="hidden" value={i.protectboardimg} name="beforeimg"/>

                                        <input type="hidden" value={i.protectboarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.protectboarduserpsw} name="bdpwd"></input>
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

export default ProtectEditAdmin;