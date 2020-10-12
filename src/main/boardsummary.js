import React, { Component } from 'react';

class MainAnalyze extends Component {
    state = {
        link : "/boards?category="+this.props.type,
        posts : [],
        unposts : []
    }
    
    componentDidMount()
    {
        fetch(`http://localhost:8080/boards/${parseInt(this.props.type)}?limit=3`)
        .then(response => response.json())
        .then((data)=>
        {    
            console.log(data);
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
                <a key={post.ID} href={"/boards/"+post.ID} className="h-8 block font-mono overflow-hidden text-small border-l border-r border-b border-red-200 ml-2 box-border px-3 py-1 ">{post.title}</a>))
            }
                        {
                (this.state.unposts.map((post)=>
                <div key={post.id} className="h-8 font-mono overflow-hidden text-small border-l border-r border-b border-red-200 ml-2 px-3 py-1">{post.title}</div>))
            }
            </div>
        );
    }
}

export default MainAnalyze;
