import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./component/Main";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import FreeBoard from './component/FreeBoard';
import Find from './component/Find';
import Protect from './component/Protect';
import Signup from './component/Signup';
import Signin from './component/Signin';
import Write from './component/Write';
import BoardContent from'./component/BoardContent'
import BoardEditAdmin from './component/BoardEditAdmin';
import BoardDelAdmin from './component/BoardDelAdmin';
import CommentDel from './component/CommentDel';
import FindWrite from './component/FindWrite';
import FindContent from './component/FindContent';
import FindEditAdmin from './component/FindEditAdmin';
import FindDelAdmin from './component/FindDelAdmin';
import FindCommentDel from './component/FindCommentDel';
import ProtectWrite from './component/ProtectWrite';
import ProtectContent from './component/ProtectContent';
import ProtectDelAdmin from './component/ProtectDelAdmin';
import ProtectEditAdmin from './component/ProtectEditAdmin';
import ProtectCommentDel from './component/ProtectCommentDel';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

  render() {
    const {username} = this.state;
    return (
        <Router>
           <Route exact path="/" component={Main}/>
           <Route path="/freeboard" component={FreeBoard}/>
           <Route path="/find" component={Find}/>
           <Route path="/protect" component={Protect}/>

           <Route path="/signup" component={Signup}/>
           <Route path="/signin" component={Signin}/>

           <Route path="/write" component={Write}/>

           <Route path="/protectwrite" component={ProtectWrite}/>
           <Route path="/protectcontent:protectboardId" component={ProtectContent}/>
           <Route path="/protectdeladmin:protectboardId" component={ProtectDelAdmin}/>
           <Route path="/protecteditadmin:protectboardId" component={ProtectEditAdmin}/>
           <Route path="/delprotectcm:protectboardId" component={ProtectCommentDel}/>

           <Route path="/findwrite" component={FindWrite}/>
           <Route path="/findcontent:findboardId" component={FindContent}/>
           <Route path="/findeditadmin:findboardId" component={FindEditAdmin}/>
           <Route path="/finddeladmin:findboardId" component={FindDelAdmin}/>
           <Route path="/delfindcm:findboardId" component={FindCommentDel}/>

           <Route path="/boardcontent:boardId" component={BoardContent}/>
           <Route path="/editadmin:boardId" component={BoardEditAdmin}/>
           <Route path="/deladmin:boardId" component={BoardDelAdmin}/>
           <Route path="/delcm:boardId" component={CommentDel}/>
        </Router>
    );
    ;
  }
}

export default App;