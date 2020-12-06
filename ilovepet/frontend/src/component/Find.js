import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../container/Header";
import Footer from "../container/Footer";
import BoardContent from './BoardContent';
import '../css/find.css';

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
                    <div className="findmaster">
                        
                        <h1 className="h1find">찾아주세요</h1>
                        <div className="findwrite">
                           <a className="fwr" href="./findwrite">게시물작성</a>
                        </div>

                        <div className="find-list">
                            
                            
                            {findboards.map((i)=>
                            
                                <div className="list">
                                    <Link className="findlink" to={`/findcontent${i._id}`}>
                                    
                                    
                                        <img width="200px" key={i._id} src={"/images/"+i.findboardimg}></img>
                                        <div className="pla" key={i._id}>{i.findboardplace}</div>
                                        <div key={i._id}>{i.findboardtitle}</div>
                                        <div key={i._id}>{i.findboarduserid}</div>
                                        {console.log("../image/"+i.findboardimg)}
                                    
                                    </Link>
                                </div>
                            
                            )}
                            
                        </div>

                       
                    </div>
                    
                }
                <Footer />
            </div>
        )
    }
}

export default Find;