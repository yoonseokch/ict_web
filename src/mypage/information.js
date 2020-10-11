import React, { Component } from 'react';
import Smallbox from './smallbox.js';
//import { Redirect,Route, BrowserRouter as Router, Switch } from "react-router-dom"
class Information extends Component {
    state = {
        user:[],
        message : "미인증",
        isLawyer: false,
        after: false
    };
    componentDidMount()
    {
        fetch('http://localhost:8080/user/'+parseInt(document.cookie.split("=")[1]))
        .then(response => response.json())
        .then((data)=>
        {    
            console.log(data);
            this.setState({user : data});
            if (this.state.user.lawyer===1)
            {
                this.setState(
                    {
                        after: true,
                        message: "인증됨",
                        isLawyer: true
                    }
                )
            }
        });
    }
    render() {
        return ( 
            <div className="my-8 w-full text-2xl pl-10">
                <div>
                {this.state.user.name}
                </div>
                <div>
                <div className="flex mt-10">
                    <Smallbox data={this.state.user.phone} name="전화번호"/>
                    <Smallbox data={this.state.user.email} name="email"/>
                </div>
                <div className="flex mt-5">
                <Smallbox data={this.state.user.birth} name="생일"/>
                <Smallbox data={this.state.message} name="변호사 인증 여부"/>
                </div>
                {this.state.after && this.state.user.lawyer && 
                <div className="mr-20 right-0 bottom-0 mt-16">
                    <button type="button" className="float-left text-base bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">변호사 인증하기</button>
                </div>}
                </div>
            </div>
        );
    }
}

export default Information;
