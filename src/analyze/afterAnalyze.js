import React,{Component} from 'react';
import Smallbox from './smallbox.js';
import Judgement from './judgement.js';
class afterAnalyze extends Component{
    reload= () =>{
        window.location.href="/analyze";
    }
    render()
    {
        return(

            <div className="mt-3 w-1/2 ml-auto mr-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="text-2xl">내 소장 키워드</strong>
                <p className="pl-3 mt-2">내 소장 분석에서 비중 있게 분석 된 키워드입니다. </p>
                <div className="mt-3 mb-3 overflow-x-scroll"> 
                    <ul>
                         {this.props.keywords.map((post) => (
                          <Smallbox key={post} contents={post}/>
                          ))}
                    </ul>
                </div>
                <div className="mb-4 w-2/3 ml-auto mr-auto overflow-y-scroll h-64">
                    {this.props.ids.map((id)=>(
                        <Judgement key={id.ID} id={id}/>
                    ))}
                </div>
                <div onClick={this.reload} className="mb-3 w-1/3 ml-auto mr-auto border border-red-700 text-center font-semibold">다른 사례 분석하기</div>
                <div className="mb-3 w-1/3 ml-auto mr-auto border border-red-700 text-center font-semibold">관련 변호사 추천받기</div>
            </div>
        );
    }
}

export default afterAnalyze;