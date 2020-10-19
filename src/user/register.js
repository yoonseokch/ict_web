import React,{Component} from 'react';
import '../styles/Login.css';
import Lawbot from '../img/logo.png';
import {MyContext} from '../context.js';
class register extends Component
{
    state= {
        canMake : false,
        isLawyer : false,
    }
    qualification = (e) =>{
        if (e.target.id==="case1")
        {
            this.setState({
                isLawyer:false
            });
            e.target.classList.remove("bg-gray-500");
            document.getElementById("case2").classList.remove("bg-blue-500")
            e.target.classList.add("bg-blue-500");
            document.getElementById("case2").classList.add("bg-gray-500")
        }
        else
        {
            this.setState({
                isLawyer:true
            });
            e.target.classList.remove("bg-gray-500");
            document.getElementById("case1").classList.remove("bg-blue-500")
            e.target.classList.add("bg-blue-500");
            document.getElementById("case1").classList.add("bg-gray-500")
            
        }
    }
    redundancyCheck = () =>
    {
        let b= this.context;
        var data={
            userID : document.getElementById("ID").value
        };
        if (data.userID.length<5)
        {
            window.alert('아이디는 5자 이상이어야 합니다');
            return;
        }
        if (data.userID.length>20)
        {
            window.alert('아이디는 20자 이하이어야 합니다');
            return;
        }
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
    submit = () =>
    {
        var a={

        };
        a.userID=document.getElementById("ID").value;
        a.userPW=document.getElementById("password").value;
        a.name=document.getElementById("name").value;
        a.birth=document.getElementById("birth").value;
        a.email=document.getElementById("email").value;
        a.phone=document.getElementById("phone").value;
        a.Lawyer=this.state.isLawyer;
        let b=this.context;
        if (this.state.canMake)
        {
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
        }
        else
        {
            alert("아이디 중복 체크를 해주세요");
        }
    }
    render()
    {
        return(
            <div>
                <img onClick={this.goHome} className="block ml-auto mr-auto" src={Lawbot} alt="로봇사진"></img>
                <div className="bg-white shadow-md w-144 ml-auto mr-auto block rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4 py-1">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        아이디
                        </label>
                        <input className="shadow w-3/4 mr-6 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ID" type="text" placeholder="ID"/>
                        <button onClick={this.redundancyCheck} className="w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-0">중복확인</button>
                    </div>
                    <div className="mb-2">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        패스워드
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                    </div>
                    <div className="mb-2">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        이름
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="이름"/>
                    </div>
                    <div className="mb-2">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        생년월일
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="birth" type="DATE" placeholder=""/>
                    </div>
                    <div className="mb-16">
                        <label className="pl-1 w-full block text-gray-700 text-sm font-bold mb-2">
                        자격
                        </label>
                        <div className="w-1/3 mb-4 float-left ml-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="case1" onClick={this.qualification}>일반회원</div>
                        <div className="w-1/3 mb-4 float-right mr-16 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="case2" onClick={this.qualification}>변호사</div>
                    </div>
                    <div className="mb-2 py-1">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        전화번호
                        </label>
                        <input className="shadow w-3/4 mr-6 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="phone" placeholder="010-XXXX-XXXX"/>
                        <button onClick={this.redundancyCheck} className="w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-0">인증</button>
                    </div>
                    <div className="mb-2">
                        <label className="pl-1 block text-gray-700 text-sm font-bold mb-2">
                        이메일
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="이메일"/>
                    </div>
                    <div className="items-center justify-between">
                    <button onClick={this.submit} className="mt-2 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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