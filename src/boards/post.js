//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import '../styles/tailwind.css';
class post extends Component{
    state={
        posts:[]
    }
    locate = ()=>{
        window.location.href="/boards/"+this.props.post.ID;
    }
    render()
    {
        if ((window.location.search.split('?category=')[1]==="0") || (parseInt(window.location.search.split('?category=')[1])===this.props.post.boardCategory) || (window.location.search===""))
        {
            return(
                <div onClick={this.locate}className="border-2 h-20 bg-white rounded-none overflow-hidden">
                    <div className="ml-5 mt-3 font-bold">
                    {this.props.post.title}
                    </div>
                    <div className="w-10/12 ml-5 mt-1 pr-5 overflow-x-hidden overflow-y-hidden whitespace-normal h-5">
                    {this.props.post.content}
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div></div>
            );
        }

    }
}

export default post;