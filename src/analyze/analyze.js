import React,{Component} from 'react';
import Afteranalyze from './afterAnalyze.js';
import {MyContext} from '../context.js';

class Analyze extends Component{
    state={
        useImage : true,
        image : null,
        submit : false,
        keywords : [
            "이혼","결혼","재혼","삼혼","석주형","바보",
        ],
        ids : [
            { ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"},{ ID:64440 , caseName: "손해배상(기)"}
        ]
    }
    componentDidMount(){
        
        var a=window.location.search.split('?value=')[1];
        if (a!==undefined)
        {
         //   window.location.href="/analyze";
            document.getElementById("grid-state").value=a;
        }
    }
    analyze = (event) =>
    {
        //fetch api 
        var b= this.context;
        let data = new FormData();
        data.append('temp', document.getElementById("input").elements[0].files[0]);
        fetch(`${b.API_URL}/apicall1`, {
            method: 'POST',
            body: data,
            headers: {
                'token': `${sessionStorage.getItem('token')}`
              //  'Content-Type': 'multipart/form-data',
            },
        }).then((result) => {
            return result.json();
        }).then((result) => {
            var keywords=[];
            for(const elem of result.images[0].fields) {
                if (keywords.length<=10)
                {
                keywords.push(elem.inferText);
                }
            }
            this.setState({
                submit : true,
                keywords: keywords,
                ids : result.ids
            });
        });
    }
    useText = () =>
    {
        this.setState(
            {
                useImage : false
            }
        );
    }
    onImageChange = (event,onChange) => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: URL.createObjectURL(img)
          });
        }
        let data = new FormData();
        data.append('temp', document.getElementById("input").elements[0].files[0]);
            var b=this.context;
          fetch(`${b.API_URL}/apicall`, {
            method: "POST",
            body: data,
            headers: {
                'token': `${sessionStorage.getItem('token')}`
                // 'Content-Type': 'multipart/form-data',
                // 'Accept': 'application/json',
            },
          }).then((result) => {
            return result.json();
          }).then((result) => {
            var txt = "";
            for(const elem of result.images[0].fields) {
                txt += elem.inferText + " ";
            }
            var regEx = /청\s?구\s?취\s?지/gmu;
            var regEx1 = /청\s?구\s?원\s?인/gmu;
            var split = txt.split(regEx);
            if(split.length !== 1) {
              var split1 = split[1].split(regEx1);
            document.getElementById("purpose").innerHTML=split1[0];
            document.getElementById("cause").innerHTML=split1[1];
            }
            else{
              var split2 = txt.split(regEx1);
              if(split2.length !== 1) {
                document.getElementById("cause").innerHTML=split2[1];
              }
            }});
    };
    
    render()
    {
        if (!this.state.submit)
        {
        return(
        <div className="bg-gray-100 w-full py-10"> 
        <div className="shadow-xl bg-white w-240 pb-10 ml-auto mr-auto border-4 border-white rounded-lg"> 
        <div className="relative w-192 object-center mr-0 pt-8 p-0 ml-auto mr-auto text-center mb-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">원고의 기준에서 소장을 작성해주세요!</strong>
        </div>
        <div className="bg-red-100 border border-red-400 mt-8">
        <div className="w-full md:w-3/4 ml-auto mr-auto">
            <label className="w-1/4 pt-3 text-red-700 block uppercase tracking-wide font-bold mb-2 mr-auto text-left">
                분야 선택
            </label>
            <div id="relative">
                <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white" id="grid-state">
                    <option value="0">자동차</option>
                    <option value="1">산업재해</option>
                    <option value="2">환경</option>
                    <option value="3">언론보도</option>
                    <option value="4">지식재산권</option>
                    <option value="5">의료</option>
                    <option value="6">건설</option>
                    <option value="7">국가</option>
                    <option value="8">기타</option>
                    {/* <option value="10">언론</option>
                    <option value="11">건축</option>
                    <option value="12">국가</option>
                    <option value="13">기타</option> */}
                </select>
            </div>
        </div>
        <div className="pt-2 w-3/4 text-left ml-auto mr-auto text-red-700 font-bold">
            소장 양식 입력
        </div>
        {this.state.useImage && 
        <form id="input">
            <input className="pt-2 w-1/3 overflow-hidden" type="file" name="myImage" onChange={this.onImageChange} />
            <div className="h-144 border overflow-y-scroll border-red-400 w-3/4 ml-auto mr-auto my-4">
                <div className="w-1/2 ml-auto mr-auto mt-6 text-2xl font-bold text-red-700">소 장</div>
                <div className="w-1/2 ml-auto mr-auto mt-2 text-xl font-bold text-red-700">청 구 취 지</div>
                <textarea className="shadow appearance-none rounded h-48 w-4/5 my-2 px-3 py-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="purpose" type="text" placeholder="청구취지를 자세히 입력해주세요 &#10;청구취지 작성 예시&#10;1. 원고와 피고는 이혼한다.&#10;2. 피고는 원고에게 위자료로 금 300만원을 이혼성립과 동시에 지급하되, 그 익일부터 다 지급하는 날까지 년 15%의 지연이자를 더하여 지급한다."/>
                <div className="w-1/2 ml-auto mr-auto text-xl font-bold text-red-700">청 구 원 인</div>
                <textarea className="shadow appearance-none rounded h-48 w-4/5 my-4 px-3 py-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="cause" type="text" placeholder="청구원인을 자세히 입력해주세요 &#10;1. 당사자들의 관계&#10;2. 금전거래 또는 대여사실 &#10;3. 결론"/>
            </div>
        </form>}

        <button onClick={this.analyze} className="mb-3 bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 m-0 rounded ">유사판례 분석</button>
        </div>
        
        </div>
        </div>
        </div>
        );
        }
        else
        {
            return(
                <Afteranalyze keywords={this.state.keywords} ids={this.state.ids}/>
            );
        }
    }
}
Analyze.contextType=MyContext;
export default Analyze;