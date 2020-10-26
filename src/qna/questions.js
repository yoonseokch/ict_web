//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import {MyContext} from '../context.js';
import Question from './question.js';
class findQna extends Component{
    state={
        questions:[]
    }
    componentDidMount(){
        let b= this.context;
        console.log(`${b.API_URL}/qna/question`);
        fetch(`${b.API_URL}/qna/question`,{
            method: "GET",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
        }})
        .then(response => response.json())
        .then((data)=>
        {
            console.log(data);
            this.setState({questions : data.posts,tags:data.tags});
        })
    }
    render()
    {
        return(
            <div className="w-4/5 mt-3  ml-auto mr-auto">
                {this.state.questions.map((question,index) => (
                    <Question key={question.ID} question={question}/>
                ))}
            </div>
        );
    }  
}
findQna.contextType=MyContext;
export default findQna;