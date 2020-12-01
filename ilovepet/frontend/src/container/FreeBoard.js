import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Footer from "../component/Footer";



class FreeBoard extends React.Component{
    
    
    
    constructor(props){
        super(props);
        this.state={
            title:'',
            user:''
            
        };
    }

    render(){

      
        axios.post("http://localhost:3002/Readboard")
        .then(({board})=>{this.setState({ title:board.boardtitle,user:board.boarduserid});})
        .catch(e=>{console.error(e);});
        

   

        return(
            <div>
                <Header />
                
                {
                    <div>
                        <h1>자유게시판</h1>
                        <div className="freeboard-list">
                            <tr>
                                <td>제목</td>
                                <td>날짜</td>
                                <td>작성자</td>
                            </tr>
                            <tr>
                                <td> <a href="">{this.state.title}</a></td>
                                <td> date </td>
                                <td> {this.state.user} </td>
                            </tr>
                               
                            

                        </div>

                       <div>
                           <a href="./write">글쓰기</a>
                       </div>

                    </div>
                    
                }
                <Footer />
            </div>
        )
    }
}

export default FreeBoard;