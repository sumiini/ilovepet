import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import BoardContent from './BoardContent';



class FreeBoard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            boards:[],
        };
    }
   
    
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
        console.log(boards.map(i=>i._id));
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
                            
                            {boards.map((i)=>
                                <tr>
                                    <td key={i._id}>{cnt++}</td>
                                    <td key={i._id}><Link to={`/boardcontent${i._id}`}>{i.boardtitle}</Link></td>
                                    
                                    <td key={i._id}>{i.boarduserid}</td>
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