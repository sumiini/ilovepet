import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../container/Header";
import Footer from "../container/Footer";
import BoardContent from './BoardContent';

class Find extends React.Component{
    constructor(props){
        super(props);
        this.state={
            findboards:[],
        };
    }
   
    
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readfindboard');
            console.log("response"+response.data);
            this.setState({
                findboards:response.data,
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
        const{findboards}=this.state;
        console.log(findboards.map(i=>i._id));
  
   
        return(
            <div>
                <Header />
                
                {
                    <div>
                        
                        <h1>찾아주세요</h1>
                        <div className="find-list">
                            
                            {findboards.map((i)=>
                            
                            
                                <Link to={`/findcontent${i._id}`}>
                                 <div>
                                    
                                    <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                    <div key={i._id}>{i.findboardplace}</div>
                                    <div key={i._id}>{i.findboardtitle}</div>
                                    <div key={i._id}>{i.findboarduserid}</div>
                                    {console.log("../image/"+i.findboardimg)}
                                </div>
                                </Link>
                               
                            
                            )}
                            
                        </div>

                       <div>
                           <a href="./findwrite">게시물작성</a>
                       </div>

                    </div>
                    
                }
                <Footer />
            </div>
        )
    }
}

export default Find;