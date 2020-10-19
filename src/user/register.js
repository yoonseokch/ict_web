import React,{Component} from 'react';
import '../styles/Login.css';
import Lawbot from '../img/logo.png';
import {MyContext} from '../context.js';
class register extends Component
{
    state= {
        canMake : false
    }
    redundancyCheck = () =>{
        let b= this.context;
        var data={
            userID : document.getElementById("ID").value
        };
        fetch(`${b.API_URL}/register/check`,{
            method : 'POST',
            headers : {
                token : sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body :JSON.stringify(data)
        }).then(response => response.json())
        .then((data)=>
        {
            if (data.success===true)
            {
                alert("회원가입이 가능한 아이디입니다");
                this.setState({
                    canMake: true
                });
                document.getElementById("ID").disabled=true;
            }
            else
            {
                alert("이미 있는 아이디입니다");
            }
        })
    }
    goHome = () =>{
        window.location.href="/"
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    submit = () =>
    {
        var a={

        };
        a.userID=this.state.userID;
        a.userPW=this.state.userPW;
        a.name=this.state.name;
        a.birth=this.state.birthdate;
        a.email=this.state.email;
        a.phone=this.state.phone;
        if (this.state.sex==="남")
        {
            a.sex=0;
        }
        else if (this.state.sex==="여")
        {
            a.sex=1;
        }
        else
        {
            alert("성별을 다시 입력해주세요!");
            return;
        }
        let b= this.context;

        a.Lawyer=this.state.isLawyer;
        fetch(`${b.API_URL}/register`, {
            method: "POST",
            headers: {
                'token': `${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
        })
        .then(response => response.json())
        .then(data => {
        if (data.success===true)
        {
        alert("회원가입을 성공하셨습니다");
        window.location.href="/";
        }
        else
        {
        alert("이미 존재하는 아이디입니다");
        }
        })
     //   window.location.href="/";
    }
    render()
    {
        return(
            <div>
                <img onClick={this.goHome} className="block ml-auto mr-auto" src={Lawbot} alt="로봇사진"></img>
                <div className="bg-white shadow-md w-144 ml-auto mr-auto block rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6 py-1">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        아이디
                        </label>
                        <input className="shadow w-3/4 mr-6 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ID" type="text" placeholder="ID"/>
                        <button onClick={this.redundancyCheck} className="w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-0">중복확인</button>
                    </div>
                    <div className="mb-4">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        패스워드
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                    </div>
                    <div className="mb-4">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        이름
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="이름"/>
                    </div>
                    <div className="mb-4">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        생년월일
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="birth" type="DATE" placeholder=""/>
                    </div>
                    <div className="items-center justify-between">
                    <button onClick={()=>{window.location.href="/register"}} className="mt-2 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    회원가입
                    </button>     
                    </div>
                </div>
            </div>
        )
    }
}
register.contextType=MyContext;
export default register;