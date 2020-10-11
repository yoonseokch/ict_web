import React, { Component } from 'react';
import Boardsummary from './boardsummary.js';
class Mainboards extends Component {
    state = {
        boardNames : [["로봇후기 게시판","1"],["재판후기 게시판","2"],["자유 게시판","3"]]
    }
    render() {
        return ( 
            <div className="w-2/3 mt-10 ml-auto mr-auto">
            <div className="font-bold text-2xl">법률 게시판</div> 
            <div className="flex">
            {
                (this.state.boardNames.map((name)=>
                <Boardsummary key={name} type={name[1]} value={name[0]}/>))
            }
            </div>
            </div>
        );
    }
}

export default Mainboards;
