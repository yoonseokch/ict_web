import React, { Component } from 'react';
import Intli from './intLi.js';
import MyIntLi from './myIntLi.js';
import {MyContext} from '../context.js';
//import { Redirect,Route, BrowserRouter as Router, Switch } from "react-router-dom"
class Information extends Component {
    state = {
        fields:["자동차"],
        fieldName : ["자동차","산업재해","환경","언론보도","지식재산권","의료","건설","국가","기타"],
        myInterests : []
    };
    delete = (e) =>{
        let b= this.context;
        var a={};
        a.Category_ID=this.state.fieldName.indexOf(e.target.value);
        fetch(`${b.API_URL}/user/interests`, {
            method: "DELETE",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
        })
        .then(response => response.json())
        .then(data => {
            window.location.href="/mypage/interests";
        })
    }
    valueChange = (e) => {
        document.getElementById("input").value=e.target.innerHTML;
        this.change();
    }
    keyup = (e) => {
        if (e.key==="Enter")
        {
            if (this.state.fieldName.includes(document.getElementById("input").value))
            {
                if (!this.state.fields.includes(document.getElementById("input").value))
                {
                    var a={};
                    a.Category_ID=this.state.fieldName.indexOf(document.getElementById("input").value);
                    let b= this.context;
                    fetch(`${b.API_URL}/user/interests`, {
                        method: "POST",
                        headers: {
                            'token': `${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(a),
                    })
                    .then(response => response.json())
                    .then(data => {
                        window.location.href="/mypage/interests";
                    })
                }
            }
        }
    }
    change = () => {
        var a=[];
        for (var elem of this.state.fieldName)
        {
            if (elem.indexOf(document.getElementById("input").value)!==-1)
            {
                a.push(elem);
            }
        }
        this.setState({
            myInterests : a
        });
    }
    componentDidMount()
    {
        let b= this.context;

        fetch(`${b.API_URL}/user/interests/`,
        {
            headers:{
                'token': `${sessionStorage.getItem('token')}`,
            }
        })
        .then(response => response.json())
        .then((data)=>
        {    
            var a=[];
            for (var elem of data)
            {
                a.push(elem.Category_ID);
            }
            this.setState({fields : a});
        });
    }
    render() {
        return ( 
            <div className="my-8 w-full pl-10 pr-20">
                <div className="font-semibold text-2xl">
                  내 관심분야
                </div>
                <div className="flex overflow-hidden bg-gray-100 w-3/5 h-40 mt-16 rounded-sm">
                    {(this.state.fields.length===0) && 
                    <p className="block ml-auto mr-auto mt-16 text-xl font-bold ">관심분야가 없습니다</p> 
                    }
                    {(this.state.fields.length>0) && 
                    <div className="w-full">
                        {this.state.fields.map((interest) => (
                    <MyIntLi onClick={this.delete} key={interest} content={this.state.fieldName[interest]}/>
                        ))}
                    </div>
                    }
                </div>
                <input id="input" type="text" onKeyUp={this.keyup} placeholder="관심분야를 입력해주세요" onChange={this.change} className="w-3/5 mt-5 h-10 bg-gray-100 pl-5"></input>
                <ul id="fieldsList" className="w-3/5 h-16">
                {this.state.myInterests.map((interest) => (
                    <Intli onClick={this.valueChange} key={interest} content={interest}/>
                ))}
                </ul>
            </div>
        );
    }
}
Information.contextType=MyContext;
export default Information;
