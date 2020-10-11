import React, { Component } from 'react';
class Document extends Component {

    render() {
        return ( 
            <a href="/interpret" className="block w-2/3 pt-10 ml-auto mr-auto">
            <div className="font-bold text-2xl">법률 문서 해석</div>
            <div className="text-center text-xl text-red-700 font-bold py-2 w-4/5 mx-auto border-2 border-red-700 rounded-lg mt-10">법률 문서 올리고 쉬운 해석 받아보기</div>
            </a>
        );
    }
}

export default Document;
