//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
class findQna extends Component{
    
    render()
    {
        return(
            <input className="mt-4 ml-auto mr-auto w-4/5 block bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 appearance-none leading-normal" type="email" placeholder="키워드로 검색하세요"/>
        );
    }  
}

export default findQna;