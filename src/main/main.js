import React, { Component } from 'react';
import Analyze from './mainanalyze.js';
import Document from './document.js';
import Boards from './mainboards.js';
import FindLawyer from './findlawyer.js';
//import { Redirect,Route, BrowserRouter as Router, Switch } from "react-router-dom"
class Main extends Component {
    render() {
        return ( 
            <div className="pt-10 pb-10 w-full bg-gray-100 flex">
            <div className="shadow-xl w-320 pb-10 ml-auto mr-auto bg-white">
                <Analyze/>
                <Document/>
                <Boards/>
                <FindLawyer/>
            </div>
            </div>
        );
    }
}

export default Main;
