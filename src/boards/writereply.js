//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import Write from '../img/write.png';
import '../styles/Bar.css';
import {MyContext} from '../context.js';
class WriteReply extends Component{
    state={
        user:[]
    }
    enter = (event) => {
        if (event.key==="Enter"){
            this.submit();
        }
    }
    submit = () => {
        let b= this.context;
        var a={};
        a.content=document.getElementById("input1").value;
        console.log(document.URL);
        if (a.content==="")
        {
            alert("댓글을 입력해주세요!");
            return;
        }
        a.Post_ID=parseInt(this.props.location.pathname.split("/")[2]);
        a.User_ID=this.state.user.ID;
        console.log(a);
        fetch(`${b.API_URL}/reply/write`,{
            method: "POST",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(a),
        })
        .then(response => response.json())
        .then((data)=>
        {    
            
            window.location.href="/boards/"+document.URL.split("/")[4];
        });
    }
    componentDidMount(){
        let b= this.context;

        fetch(`${b.API_URL}/user/`,{
            headers : {
                'token': `${sessionStorage.getItem('token')}`,
            }
        })
        .then(response => response.json())
        .then((data)=>
        {    
            this.setState({user : data});
        });
    }
    render()
    {
        return(
            <div className="w-full bg-gray-100 h-10 overflox-x-scroll flex m-0">
                <input id="input1" className="pl-3 w-full bg-gray-100 text-sm focus:outline-none border" onKeyPress={this.enter} type="text" placeholder="댓글을 입력하세요"></input>
                <div onClick={this.submit} className="w-10 px-1 py-1">
                <img alt="write" src={Write}/>
                </div>
            </div>
        );
    }
}
WriteReply.contextType=MyContext;
export default WriteReply;