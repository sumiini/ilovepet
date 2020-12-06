import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../container/Header";
import Footer from "../container/Footer";
import BoardContent from './BoardContent';
import '../css/protect.css'

class Protect extends React.Component{
    constructor(props){
        super(props);
        this.state={
            protectboards:[],
        };
    }
   
    
    loadingData=async()=>{
        try{
            const response = await axios.get('http://localhost:3002/Readprotectboard');
            console.log("response"+response.data);
            this.setState({
                protectboards:response.data,
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
        const{protectboards}=this.state;
        console.log(protectboards.map(i=>i._id));
  
   
        return(
            <div>
                <Header />
                
                {
                    <div className="protectmaster">
                        
                        <h1 className="h1protect">보호중이에요</h1>
                        <div className="protectwrite">
                           <a className="pwr" href="./protectwrite">게시물작성</a>
                        </div>
                        <div className="protect-list">
                            
                            {protectboards.map((i)=>
                            
                            
                                
                                <div className="list">
                                    <Link className="protectlink" to={`/protectcontent${i._id}`}>
                                    
                                        <img width="200px" key={i._id} src={"/images/"+i.protectboardimg}></img>
                                        <div className="pla" key={i._id}>{i.protectboardplace}</div>
                                        <div key={i._id}>{i.protectboardtitle}</div>
                                        <div key={i._id}>{i.protectboarduserid}</div>
                                        {console.log("../image/"+i.protectboardimg)}
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

export default Protect;