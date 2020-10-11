import React, { Component } from 'react';

class profileList extends Component{
    render()
    {
        return(
            <div className="w-1/4 m-0 inline-block inset-0">
<ul className="my-10 border-r-2">
    <li className="mr-6 text-center text-xl font-semibold py-8">
        <a className="text-gray-700 hover:text-blue-800" href="/mypage/profile">회원정보</a>
    </li>
    <li className="mr-6 text-center text-xl font-semibold py-8">
        <a className="text-gray-700 hover:text-blue-800" href="/mypage/interests">관심분야</a>
    </li>
    <li className="mr-6 text-center text-xl font-semibold py-8">
        <a className="text-gray-700 hover:text-blue-800" href="/mypage">즐겨찾기</a>
    </li>
    <li className="mr-6 text-center text-xl font-semibold py-8">
        <a className="text-gray-700 hover:text-blue-800" href="/mypage">게시판 관리</a>
    </li>
    <li className="mr-6 text-center text-xl font-semibold py-8">
        <a className="text-gray-700 hover:text-blue-800" href="/mypage">Q&A 관리</a>
    </li>
</ul>
</div>
        );
    }
}

export default profileList;