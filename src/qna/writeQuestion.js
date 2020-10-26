//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import {MyContext} from '../context.js';

class New extends Component{
    state={
        categories : [
            "자동차","산업재해","환경","언론보도","지식재산권","의료","건설","국가","기타"
        ]
    }
    postsubmit = () =>
    {
        
        let b= this.context;
        var a={

        };
        var e = document.getElementById("boardCategory");
        a.Category= parseInt(e.options[e.selectedIndex].value);
        a.title=document.getElementById("title").value;
        a.content=document.getElementById("content").value;
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
        //   alert(data.success);
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
                        <button type="button" onClick={this.postsubmit} className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
                            글쓰기
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
New.contextType=MyContext;
export default New;