//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import BoardCategory from './BoardCategory.js';
class BoardBar extends Component{
    state={
        BoardName:[{key : 0 , name: "전체" },{ key : 1,name:"로봇후기 게시판"},{key:2,name:"재판후기 게시판"},{key:3,name:"자유게시판"}]
    }
    render()
    {
        return(
            <div className="w-full h-16">
                <ul className="w-144 block ml-auto mr-auto h-16">
                {this.state.BoardName.map((category) => (
                    <BoardCategory key={category.key} value={category.key} name={category.name} />
                ))}
                </ul>
            </div>
        );
    }
}
export default BoardBar;