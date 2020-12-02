import React from "react";
import axios from 'axios';

import Header from "../component/Header";
import Footer from "../component/Footer";



class FreeBoard extends React.Component{
    
    state={
        
        board:[],
    };
    
    constructor(props){
        super(props);
        
    }

   

    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readboard');
            
            this.setState({
                board:response.data,
            });
            
            console.log("res"+response.data);
        }catch(e){
            console.log(e);
        }
    };
    componentDidMount() {
         const { loadingData } = this;
         loadingData();
    }



    render(){
        console.log("hihi")
        const{board}=this.state;
        console.log(board);
      
        //axios.post("http://localhost:3002/Readboard")
        //.then(({board})=>{this.setState({ title:board.boardtitle,user:board.boarduserid});})
        //.catch(e=>{console.error(e);});
        //console.log(this.state.title)
        

   

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
                                
                                <td> <a href="">{board.title}</a></td>
                                <td> date </td>
                                <td> {board.user} </td>
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