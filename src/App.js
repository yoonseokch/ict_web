import React,{Component} from 'react';
import Bar from './Bar.js';
import './App.css';
import analyze from './analyze/analyze.js';
import Login from './user/Login.js';
import Register from './user/register.js';
import { Redirect,Route, BrowserRouter as Router, Switch } from "react-router-dom"
import boards from './boards/boards.js';
import Mypage from './mypage/mypage.js';
import Main from './main/main.js';
import Qna from './qna/qna.js';
class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state=({
      user:-1
    });
  }
  increase = () =>  
  {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location='/';
  }
  render()
  {
    var a=document.cookie.split("=");
    if (a[1]!==undefined)
    {
      return(
        <div>
        <Bar/>
          <Router>
            <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/boards" component={boards}/>
            <Route path="/analyze" component={analyze}/>
            <Route path="/mypage" component={Mypage}/>
            <Route path="/qna" component={Qna} />
            <Redirect path="*" to="/" />
            </Switch>
          </Router>
        </div>
      );
    }
    else
    {
      return(
        <div>
        <main>
          <Router>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register}/>
          </Router>
        </main>
        </div>
      );
    }
  }
}

export default App;
