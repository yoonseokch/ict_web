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
        'Content-Type': 'application/json',
        }})
        .then(response => response.json())
        .then((data)=>
        {
            console.log(data);

            this.setState({posts : data});
            console.log(this.state.posts[0]);
        })
    }
    render()
    {
        return(
            <div>
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