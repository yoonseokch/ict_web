import React,{Component} from 'react';
import Afteranalyze from './afterAnalyze.js';
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
        event.preventDefault();
        let data = new FormData();
        data.append('temp', document.getElementById("input").elements[0].files[0]);
        fetch('http://localhost:8080/apicall1', {
            method: 'POST',
            body: data,
            headers: {
              //  'Content-Type': 'multipart/form-data',
            },
        }).then((result) => {
            console.log("hi");
            return result.json();
        }).then((result) => {
            var keywords=[];
            console.log(result);
            for(const elem of result.images[0].fields) {
                if (keywords.length<=10)
                {
                keywords.push(elem.inferText);
                }
            }
            console.log(keywords);
            this.setState({
                submit : true,
                keywords: keywords,
                ids : result.ids
            });
           // console.log(result.ids);
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
      };
    
    render()
    {
        if (!this.state.submit)
        {
        return(
        <div className="relative w-2/4 object-center mr-0 mt-8 p-0 ml-auto mr-auto text-center">
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
            {/* <div className="pointer-events-none absolute inset-y-0 flex items-center text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div> */}
        </div>
        <div className="pt-2 w-3/4 text-left ml-auto mr-auto text-red-700 font-bold">
            소장 양식 입력
        </div>
        {this.state.useImage && 
        <form id="input">
            <input className="pt-2 w-1/3" type="file" name="myImage" onChange={this.onImageChange} />
            <img alt="" className="w-3/4 ml-auto mr-auto" src={this.state.image} />
        {!this.state.useImage && <div/>}
        </form>}

        <button onClick={this.analyze} className="mb-3 bg-red-700 hover:bg-red-700 text-white font-bold mt-4 py-2 px-4 m-0 rounded ">유사판례 분석</button>
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

export default Analyze;