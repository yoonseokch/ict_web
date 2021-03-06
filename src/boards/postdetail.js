//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import '../styles/tailwind.css';
import Writereply from './writereply.js';
import Reply from './reply.js';
import {MyContext} from '../context.js';
class postdetail extends Component{
    state={
        post:{},
        user:[],
        replies:[]
    }
    postdelete= () =>{
        let b= this.context;

        fetch(`${b.API_URL}/boards/${this.props.location.pathname.split("/")[2]}`,{
            method: "DELETE",
            headers : {
                'token': `${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then((data)=>
        {    
            window.location.href="/boards";
        });
        
    }
    componentDidMount(){
        let b= this.context;
        fetch(`${b.API_URL}/user`,
        {
            headers : {
                'token': `${sessionStorage.getItem('token')}`
            }
        }).then(res=>res.json())
        .then((data)=>{
            this.setState({user:data});
        })
        fetch(`${b.API_URL}/boards/posts/${this.props.location.pathname.split("/")[2]}`,
        {
            headers : {
                'token': `${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then((data)=>
        {
            this.setState({post : data});
            fetch(`${b.API_URL}/reply/${this.props.location.pathname.split("/")[2]}`,{
                headers : {
                    'token': `${sessionStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then((data)=>
            {    
                this.setState({replies : data});
            });
        }).then(()=>{
            if (this.state.post===null)
            {
                window.location.href="/boards";
            }
        });
    }
    render()
    {
        if (this.state.post===null)
        {
            return (
                <div></div>
            )
        }
        else
        {
        return(
            <div className="whitespace-normal pt-12">
            <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="bg-white">
            <div className="mb-4">
            <div className="font-bold appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="제목">{this.state.post.title}</div>
            <div className="break-all flex-wrap py-2 px-3 leading-tight whitespace-normal" id="content" type="text" placeholder="제목">
                {this.state.post.content}
            </div>
            </div>

            {(this.state.post.User_ID===this.state.user.ID)&&<button type="button" onClick={this.postdelete} className="ml-3 mb-3 bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
                        삭제하기
                        </button>
            }
            </div>
            <Writereply location={this.props.location}/>
            <div className="mt-2">
            {this.state.replies.map((reply) => (
                    <Reply key={reply.ID} reply={reply}/>
                ))}
            </div>
            </div>
            </div>
        );
        }
    }
}
postdetail.contextType=MyContext;
export default postdetail;