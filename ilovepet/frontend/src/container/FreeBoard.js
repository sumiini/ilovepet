import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Footer from "../component/Footer";



class FreeBoard extends React.Component{
    state={
        boards:[],
    };
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readboard');
            console.log("hi");
            this.setState({
                boards:response.data,
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
        console.log("hihi")
        const{boards}=this.state;
        console.log(boards.map(i=>i.boardtitle));
        var cnt=0;

   
        return(
            <div>
                <Header />
                
                {
                    <div>
                        
                        <h1>자유게시판</h1>
                        <div className="freeboard-list">
                            <tr>
                                <td>No.</td>
                                <td>제목</td>
                                <td>작성자</td>
                            </tr>
                            
                            {boards.map((i,key)=>
                                <tr>
                                    <td key={key}>{cnt++}</td>
                                    <td key={key}><a href="/freeboard">{i.boardtitle}</a></td>
                                    <td key={key}>{i.boarduserid}</td>
                                </tr>
                            
                            )}
                            
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