import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../container/Header";
import Footer from "../container/Footer";
import BoardContent from './BoardContent';

import '../css/freeboard.css';



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
         loadingData();
         //loadingData();
         
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
                    <div className="freeboard">
                        
                        <h1 className="freebd">자유게시판</h1>
                        <div className="boarwritebtn">
                           <a className="btn2" href="./write">글쓰기</a>
                       </div>
                        <table className="freeboard-list">
                            <thead>
                                <tr className="headtt">
                                    <td className="th1">No.</td>
                                    <td className="th2">제목</td>
                                    <td className="th3">작성자</td>
                                </tr>

                            </thead>
                            
                            <tbody className="ttbody">
                                {boards.map((i)=>
                                    
                                    <tr className="bodytr" >
                                        <td className="td1" key={i._id}>{cnt++}</td>
                                        <td className="td2" key={i._id}><Link className="link" to={`/boardcontent${i._id}`}>{i.boardtitle}</Link></td>
                                    
                                        <td className="td3" key={i._id}>{i.boarduserid}</td>
                                    
                                    </tr>

                                
                            
                                )}

                                

                            </tbody>
                            
                            
                        </table>

                      

                    </div>
                    
                }
                <Footer />
            </div>
        )
    }
}

export default FreeBoard;