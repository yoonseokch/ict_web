import React, { Component } from 'react';
import Maincategory from './maincategory.js';
//import { Redirect,Route, BrowserRouter as Router, Switch } from "react-router-dom"
class MainAnalyze extends Component {
    state = {
        firstCategory : ["자동차","산업재해","환경","언론보도"],
        secondCategory : ["지식재산권","의료","건설","국가"],
        fieldName : ["자동차","산업재해","환경","언론보도","지식재산권","의료","건설","국가","기타"]
    };
    render() {
        return ( 
            <div className="w-2/3 pt-10 ml-auto mr-auto">
            <div className="font-bold text-2xl">유사 판례 분석</div> 
            <div className="mt-10">
                <div className="flex">
                    {this.state.firstCategory.map((interest)=>
                    <Maincategory key={interest} index={this.state.fieldName.indexOf(interest)} value={interest}/>)}
                </div>
                <div className="flex mt-10">
                {this.state.secondCategory.map((interest)=>
                    <Maincategory key={interest} index={this.state.fieldName.indexOf(interest)} value={interest}/>)}
                </div>           
            </div>
            </div>
        );
    }
}

export default MainAnalyze;
