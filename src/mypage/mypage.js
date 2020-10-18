import React, { Component } from 'react';
import ProfileList from './list.js';
import Information from './information.js';
import Interest from './interest.js';
import { Redirect,Route, BrowserRouter as Router, Switch } from "react-router-dom"
class Mypage extends Component {
    componentDidMount()
    {
        
    }
    render() {
        return (
            <div className="pt-10 w-full h-screen bg-gray-200">
                <div className="z-0 shadow-lg w-320 bg-white ml-auto mr-auto flex">
                    <ProfileList/>
                    <div className="my-10 pl-10 w-3/4">
                    <Router>
                    <Switch>
                        <Route exact path="/mypage/profile">
                            <Information />
                        </Route>
                        <Route exact path="/mypage/interests">
                            <Interest />
                        </Route>
                        <Redirect path="/mypage/*" to="/mypage/profile" />
                    </Switch>
                    </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mypage;
