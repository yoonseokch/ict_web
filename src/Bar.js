//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import './styles/Bar.css';
class Bar extends Component{
    
    render()
    {
        return(
            <div className="top">
                <div className="logo ml-24"><a href="/">LAWBOT</a></div>
                <ul>
                    <li className="list ml-20">
                        <a href="/analyze" className="link font-semibold">유사판례분석</a></li>
                    <li className="list">
                    <a href="/qna" className="link font-semibold">법률 QnA</a>
                    </li>
                    <li className="list">
                    <a href="/interpret" className="link font-semibold">법률문서해석</a>
                    </li>
                    <li className="list">
                    <a href="/boards" className="link font-semibold">게시판</a>
                    </li>
                    <li className="list">
                    <a href="/lawyers" className="link font-semibold">변호사찾기</a>
                    </li>
                </ul>
                <button></button>
                <button></button>
            </div>
        );
    }
}

export default Bar;