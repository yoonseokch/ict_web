//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import {MyContext} from '../context.js';
class Question extends Component{
    state={
        categories : [
            "자동차","산업재해","환경","언론보도","지식재산권","의료","건설","국가","기타"
        ],
        tags:[]
    }
    componentDidMount(){
        var b=this.context;
        fetch(`${b.API_URL}/qna/category`, {
            method: "GET",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => {
           this.setState({
               categories:data
           })
        }).then(()=>{
            var tags=[];
            for (var a of this.props.question.tags)
            {
                tags.push(this.state.categories[a.Category_ID].name);   
            }
            this.setState({
                tags:tags
            })
        })
    }
    render()
    {
     //   console.log(this.props.question);
        return(
            <div className="w-full mt-4 border-b">
                <div className="pl-1 text-gray-700">
                    {this.state.categories[this.props.question.Category].name}
                </div>
                <div className="pl-1 font-semibold text-gray-700 mt-1 text-2xl overflow-hidden">
                    {this.props.question.title}
                </div>
                <div className="mb-5 pl-1 text-gray-700 mt-3 text-lg truncate">
                    {this.props.question.content}
                </div>
                <div>
                {this.state.tags.map((name,idx)=>(
                    <div key={idx} className="ml-2 inline-block bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">#{name}</div>
                    ))}
                </div>
            </div>
        );
    }  
}
Question.contextType=MyContext;
export default Question;