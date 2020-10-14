//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import BoardBar from './BoardBar.js';
import '../styles/boards.css';
import '../styles/tailwind.css';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import New from "./new.js";
import Posts from "./posts.js";
import Postdetail from './postdetail.js';
class Boards extends Component{
    write = () =>{
        window.location.href="/boards/write";
    }
    render()
    {
        return(
            <div>
                <BoardBar/>
                <div className="background h-auto pb-3">
                    <div className="boardscenter">
                    <Router>
                        <Switch>
                        <Route exact path="/boards">
                        <button onClick={this.write} className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">
                        글쓰기
                        </button>
                        <Posts/>
                        </Route>
                        <Route path="/boards/write">
                            <New/>
                        </Route>
                        <Route path="/boards/:id" component={Postdetail}/>
                        </Switch>
                    </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default Boards;