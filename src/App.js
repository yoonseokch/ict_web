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
import Interpret from './interpret/interpret.js';
import Test from './test/test.js';
import { MyContext, LOCAL_URL, PRODUCTION_URL } from './context.js';
class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state=({
      API_URL : process.env.REACT_APP_LOCAL ? LOCAL_URL : PRODUCTION_URL
    });
  }
  change = (e) =>
  {
    this.setState(
      {
        user: e
      }
    )
  }
  render()
  {
    var a=sessionStorage.getItem('token');
    if ((a!==null))
    {
      return(
        <MyContext.Provider value=
        {
          {
            API_URL : this.state.API_URL,
            id: this.state.id, 
            setID: this.state.change
          }
        }
        >
        <Bar/>
          <Router>
            <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/boards" component={boards}/>
            <Route path="/analyze" component={analyze}/>
            <Route path="/mypage" component={Mypage}/>
            <Route path="/qna" component={Qna} />
            <Route path="/interpret" component={Interpret} />
            <Route path="/test" component={Test}/>
            <Redirect path="*" to="/" />
            </Switch>
          </Router>
        </MyContext.Provider>
      );
    }
    else
    {
      return(
        <div>
        <main>
          <Router>
          <Route exact path="/" >
            <Login change={this.change}></Login>
          </Route>
          <Route path="/register" component={Register}/>
          </Router>
        </main>
        </div>
      );
    }
  }
}

export default App;
