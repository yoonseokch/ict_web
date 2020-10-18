import React, { Component } from 'react';
class Document extends Component {

    render() {
        return ( 
            <a href="/lawyers" className="block w-2/3 mt-10 ml-auto mr-auto">
            <div className="font-bold text-2xl">변호사 찾기</div>
            <div className="text-center text-xl text-red-700 font-bold py-2 w-4/5 mx-auto border-2 border-red-700 rounded-lg mt-10">분야에 맞는 변호사 찾기</div>
            </a>
        );
    }
}

export default Document;
