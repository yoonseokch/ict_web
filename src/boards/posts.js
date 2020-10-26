//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import Posting from './post.js';
import {MyContext} from '../context.js';
class posts extends Component{
    state={
        posts:[]
    }
    componentDidMount(){
        let b= this.context;

        fetch(`${b.API_URL}/boards/posts`,{
            method: "GET",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        }})
        .then(response => response.json())
        .then((data)=>
        {
            this.setState({posts : data});
        })
    }
    render()
    {
        return(
            <div className="w-full">
                <ul>
                {this.state.posts.map((post) => (
                    <Posting key={post.ID} post={post}/>
                ))}
                </ul>

            </div>
        );
    }
}
posts.contextType=MyContext;
export default posts;