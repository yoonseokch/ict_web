import React, { Component } from 'react';
import {MyContext} from '../context.js';
class MainAnalyze extends Component {
    state = {
        link : "/boards?category="+this.props.type,
        posts : [],
        unposts : []
    }
    
    componentDidMount()
    {
        let b= this.context;
        fetch(`${b.API_URL}/boards/${parseInt(this.props.type)}?limit=3`,
        {
            headers: {
                'token': `${sessionStorage.getItem('token')}`
            },
        })
        .then(response => response.json())
        .then((data)=>
        {    
            if (data.length===3)
            {
                this.setState({posts : data});
            }
            else
            {
                var a=[];
                for (var i=0;i<3-data.length;i++)
                {
                    a.push({title:"아직 글이 없습니다",id:i})
                }
                this.setState({posts : data, unposts : a});
            }
        });
    }
    render() {        
        return ( 
            <div className="w-1/3 mx-0 mt-10 float-left overflow-hidden ">
            <div className="h-8 overflow-hidden font-mono font-semibold text-small border text-red-700 border-red-200 ml-2 px-3 py-1"><a href={this.state.link}>{this.props.value}</a></div>
            {
                (this.state.posts.map((post)=>
                <a key={post.ID} href={"/boards/"+post.ID} className="h-8 block truncate text-small border-l border-r border-b border-red-200 ml-2 box-border px-3 py-1 font-semibold">{post.title}</a>))
            }
                        {
                (this.state.unposts.map((post)=>
                <div key={post.id} className="h-8 overflow-hidden text-small border-l border-r border-b border-red-200 ml-2 px-3 py-1 font-semibold">{post.title}</div>))
            }
            </div>
        );
    }
}
MainAnalyze.contextType=MyContext;
export default MainAnalyze;
