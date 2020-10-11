//This component is a bar which is displayed at the top of hompage
import React,{Component} from 'react';
import Write from '../img/write.png';
import '../styles/Bar.css';
class WriteReply extends Component{
    state={
        user:[]
    }
    submit = () => {
        var a={};
        a.content=document.getElementById("input1").value;
        a.writtenDate="2020-01-10";    
        a.reports=0;
        a.Post_ID=parseInt(this.props.location.pathname.split("/")[2]);
        a.User_ID=this.state.user.ID;
     //   console.log(a);
        fetch('http://localhost:8080/reply/write',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(a),
        })
        .then(response => response.json())
        .then((data)=>
        {    
            document.getElementById("input1").value="";
        });
    }
    componentDidMount(){
        fetch('http://localhost:8080/user/'+parseInt(document.cookie.split("=")[1]))
        .then(response => response.json())
        .then((data)=>
        {    
          //  console.log(data);
            this.setState({user : data});

        });
    }
    render()
    {
        return(
            <div className="w-full bg-gray-100 h-10 overflox-x-scroll flex m-0">
                <input id="input1" className="pl-3 w-full bg-gray-100 text-sm focus:outline-none border" type="text" placeholder="댓글을 입력하세요"></input>
                <div onClick={this.submit} className="w-10 px-1 py-1">
                <img alt="write" src={Write}/>
                </div>
                
            </div>
        );
    }
}

export default WriteReply;