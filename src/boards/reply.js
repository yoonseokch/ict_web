//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import {MyContext} from '../context.js';
class Reply extends Component{
    state={
        user : []
    }
    componentDidMount()
    {
        let b= this.context;

        fetch(`${b.API_URL}/user/${this.props.reply.User_ID}`,{
            method: "GET",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }})
        .then(response => response.json())
        .then((data)=>
        {
            this.setState( {user : data});
        })
    }
    render()
    {
        return(
            <div className="w-full mt-1 rounded-lg border bg-gray-100">
                <div className="pl-4 pt-1 font-semibold w-full">
                {this.state.user.name}
                </div>
                <div className="pl-4 w-full py-1">
                    {this.props.reply.content}
                </div>
            </div>
        );
    }
}
Reply.contextType=MyContext;
export default Reply;