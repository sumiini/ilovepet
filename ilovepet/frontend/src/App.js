import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./container/Main";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import FreeBoard from './container/FreeBoard';
import Find from './container/Find';
import Protect from './container/Protect';
import Signup from './container/Signup';
import Signin from './container/Signin';
import Write from './container/Write';


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
        </Router>
    );
    ;
  }
}

export default App;