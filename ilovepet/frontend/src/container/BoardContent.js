import React from "react";
import axios from 'axios';

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

                
                <div>
                    
                    {contentboards.map(i=>
                    
                        {if(i._id===boardId){
                            return(
                                <div>
                                    

                                    
                                    <span key={i._id}>{i.boardtitle}</span>
                                    <span key={i._id}>{i.boardcontent}</span>
                                    <span key={i._id}>{i.boarduserid}</span>
                                    <form>
                                        <button >수정하기</button>
                                    </form>
                                    <form method="POST" action="http://localhost:3002/Deleteboard">
                                        <input name="delid">{i._id}</input>
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

export default BoardContent;