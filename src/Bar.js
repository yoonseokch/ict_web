//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import './styles/Bar.css';
class Bar extends Component{
    logout = () =>
    {
        var date = new Date();
        date.setDate(date.getDate() - 1);

        var willCookie = "";
        willCookie += "user=Value;";
        willCookie += "Expires=" + date.toUTCString();
        sessionStorage.removeItem("token");
        // 쿠키를 집어넣는다.
        document.cookie = willCookie;
        alert("로그아웃 되었습니다");
        window.location.href="/";
    }
    render()
    {
        return(
            <div className="top">
                <div className="logo ml-24"><a href="/">LAWBOT</a></div>
                <ul className="pl-20 flex">
                    <li className="list">
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
                    <li className="list">
                    <a href="/mypage" className="link font-semibold">마이페이지</a>
                    </li>
                    <li className="list">
                    <div onClick={this.logout} className="link font-semibold">로그아웃</div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Bar;