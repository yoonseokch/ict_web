//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import FindQna from './findQna.js';
import Questions from './questions.js';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import WriteQuestion from './writeQuestion.js';
class Qna extends Component{
    write = () =>{
        window.location.href="/qna/write";
    }
    render()
    {
        return(
        <div className="min-h-full pt-12 pb-10 w-full bg-gray-100 flex">
                <Router>
                    <Switch>
                    <Route exact path="/qna">
                    <div className="w-240 border-4 border-white rounded-lg pb-10 ml-auto mr-auto bg-white">
                    <FindQna/>
                        <div className="w-4/5 ml-auto mr-auto">
                            <div className="w-full">
                                <button onClick={this.write} className="bg-red-700 hover:bg-red-700 text-white mr-3 font-bold float-right mt-3 py-2 px-4 rounded mb-4">
                                질문하기
                                </button>
                            </div>
                        </div>
                    <Questions/>
                    </div>
                    </Route>
                    <Route path="/qna/write">
                        <WriteQuestion/>
                    </Route>
                    <Redirect path="/qna/*" to="/qna"></Redirect>
                    </Switch>
                </Router>
        </div>
        );
    }
}

export default Qna;