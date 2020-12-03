import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../component/Header";
import Footer from "../component/Footer";

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
                                <div>
                                    <label>[ 작성자 ]</label>
                                    <p/>
                                    <span key={i._id}>{i.boarduserid}</span>
                                    <form method="POST" action="http://localhost:3002/Editfindboard">
                                        <input type="hidden" value={i._id} name="edid"></input>
                                        <h3>--------------------------------------</h3>
                                        <label>[제목]</label>
                                        <input type="text" placeholder={i.findboardtitle} name="edittitle"/>
                                        <label>[내용]</label>
                                        <input type="text" placeholder={i.findboardcontent} name="editcontent"/>
                                        <label>[장소]</label>
                                        <input type="text" placeholder={i.findboardplace} name="editplace"/>
                                        <label>[이미지]</label>
                                        <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                        <label>id</label>
                                        <input type="text" name="editid"></input>
                                        <h3>--------------------------------------</h3>
                                        <label>password</label>
                                        <input type="password" name="editpwd"></input>
                                        <p/>
                                        <input type="hidden" value={i.findboardtitle} name="beforetitle"/>
                                        <input type="hidden" value={i.findboardcontent} name="beforecontent"/>
                                        <input type="hidden" value={i.findboardplace} name="beforeplace"/>
                                        <input type="hidden" value={i.findboardimg} name="beforeimg"/>

                                        <input type="hidden" value={i.findboarduserid} name="bduserid"/>
                                        <input type="hidden" value={i.findboarduserpsw} name="bdpwd"></input>
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

export default FindEditAdmin;