//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';

class BoardCategory extends Component{
    go = () =>
    {
        window.location.href=`/boards?category=${this.props.value}`;
    }
    componentDidMount()
    {
        var a=window.location.search.split("=")[1];
        if (a!==undefined)
        {
            if (parseInt(a)===this.props.value)
            {
                document.getElementById(parseInt(a)).classList.add("border-red-700");
            }
        }
    }
    render()
    {
        return(
            <li id={`${this.props.value}`} onClick={this.go} className="text-center font-semibold w-1/4 py-5 float-left block hover:bg-red-700 hover:text-white border-b-2 border-white">
                {this.props.name}
            </li>
        );
    }
}
export default BoardCategory;