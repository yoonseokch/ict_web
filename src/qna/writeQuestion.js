//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import {MyContext} from '../context.js';
import Intli from '../mypage/intLi.js';
import Tags from './tag.js';
class New extends Component{
    state={
        categories : [
            "자동차","산업재해","환경","언론보도","지식재산권","의료","건설","국가","기타"
        ],
        tagNames : [],
        tagIds : [],
        showing : [],
        postTagIDs : []
    }
    valueChange = (e) => {
        document.getElementById("input").value=e.target.innerHTML;
        this.change();
    }
    keyup = (e) => {
        if (e.key==="Enter")
        {
            if (this.state.tagNames.includes(document.getElementById("input").value))
            {
                if (!this.state.postTagIDs.includes(document.getElementById("input").value))
                {
                    if (this.state.postTagIDs.length<3)
                    {
                        var b=this.state.postTagIDs;
                        b.push(document.getElementById("input").value);
                        this.setState({
                            postTagIDs:b
                        });
                        document.getElementById("input").value="";
                        this.setState({
                            showing : []
                        })
                    }
                }
            }
        }
    }
    change = () => {
        var a=[];
        for (var elem of this.state.tagNames)
        {
            if (elem.indexOf(document.getElementById("input").value)!==-1)
            {
                a.push(elem);
            }
        }
        this.setState({
            showing : a
        });
    }
    delete = (event) =>{
        let b=this.state.postTagIDs;
        var index=this.state.postTagIDs.indexOf(event.target.parentNode.childNodes[0].innerHTML);
        b.splice(index,1);
        this.setState({
            postTagIDs:b
        });
    }
    componentDidMount()
    {
        let b=this.context;
        fetch(`${b.API_URL}/qna/category`, {
            method: "GET",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            var a= [];
            var b= []
            for (var i=0;i<data.length;i++)
            {
                a.push(data[i].name);
                b.push(data[i].id)
            }
            this.setState({
                tagNames:a,
                tagIds:b
            })
        })
    }
    postsubmit = () =>
    {
        
        let b= this.context;
        var a={
            question : {},
            category: []
        };
        for (var i=0;i<this.state.postTagIDs.length;i++)
        {
          a.category.push(this.state.tagNames.indexOf(this.state.postTagIDs[i]));
        }
        var e = document.getElementById("boardCategory");
        a.question.Category= parseInt(e.options[e.selectedIndex].value);
        a.question.title=document.getElementById("title").value;
        a.question.content=document.getElementById("content").value;
        fetch(`${b.API_URL}/qna/question`, {
            method: "POST",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
        })
        .then(response => response.json())
        .then(data => {
           alert("질문 작성이 완료되었습니다.");
           window.location.href="/qna";
        })
    }
    render()
    {        
        return(
            <div className="w-240 ml-auto mr-auto"> 
                <div className="w-full">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">분야</label>
                        <div id="categoryselect" className="inline-block relative w-64">
                            <select id="boardCategory" className="block mb-4 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                {this.state.categories.map((category)=>
                                <option key={category} value={this.state.categories.indexOf(`${category}`)}>{category}</option>)
                                }
                            </select>   
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" form="title">제목</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="제목"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" form="content">내용</label>
                            <textarea className="shadow appearance-none rounded h-64 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="content" type="text" placeholder="글을 작성해주세요"/>
                        </div>
                        <div className="w-full h-12 mb-2">
                        {this.state.postTagIDs.map((interest) => (
                            <Tags key={interest} content={interest} onClick={this.delete}/>
                        ))}
                        </div>
                        <button type="button" onClick={this.postsubmit} className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                            글쓰기
                        </button>
                        <input id="input" type="text" onKeyUp={this.keyup} placeholder="카테고리를 입력해주세요" onChange={this.change} className="w-full mt-5 h-10 bg-gray-100 pl-5"></input>
                        <ul id="fieldsList" className="w-full h-16">
                        {this.state.showing.map((interest) => (
                            <Intli onClick={this.valueChange} key={interest} content={interest}/>
                        ))}
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}
New.contextType=MyContext;
export default New;