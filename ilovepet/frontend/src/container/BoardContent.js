import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from "../component/Header";
import Footer from "../component/Footer";

class BoardContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contentboards:[],
        };
    }

    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readboard');
            console.log("hi");
            this.setState({
                contentboards:response.data,
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
        let boardId = window.location.pathname.replace("/boardcontent","");
        console.log("id이지롱"+boardId);
        const{contentboards}=this.state;
        console.log(contentboards.map(i=>i.boardtitle));
        

        return(
            <div>
                <Header />
                <div className="boardcontent">
                    {contentboards.map(i=>
                    
                        {if(i._id===boardId){
                            
                            return(
                                <div>
                                    <h4>[ 작성자 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.boarduserid}</span>

                                    <h4>[ 제목 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.boardtitle}</span>
                                    <h4>[ 내용 ]</h4>
                                    <p/>
                                    <span key={i._id}>{i.boardcontent}</span>
                                    <p/>
                                   <Link to={`/deladmin${i._id}`}>삭제</Link>
                                   <br/>
                                   <Link to={`/editadmin${i._id}`}>수정</Link>
                                    
                                </div>
                            )    
                        }}
                    )}
                    <p/>
                    <div>댓글</div>
                    <form method="POST" action="http://localhost:3002/Addcomment">
                        <labe>id</labe>
                        <input type="text" name="commentid"></input>
                        <p/>
                        <label>password</label>
                        <input type="password" name="commentpwd"></input>
                        <p/>
                        <label>댓글내용</label>
                        <input type="text" name="commentcontent"></input>
                        <input type="hidden" name="commentkey" value={boardId}/>
                        {console.log("ididididi"+boardId)}

                        <button type="submit">댓글추가</button>

                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

export default BoardContent;