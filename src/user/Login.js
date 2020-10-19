//This component is a bar which is displayed at the top of hompage
import Lawbot from '../img/logo.png';
import React,{Component} from 'react';
import '../styles/Login.css';
import {MyContext} from '../context.js';
class Login extends Component{
    state= {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    submit = () =>{
        let b= this.context;

        var a={

        };
        a.userID=document.getElementById("ID").value;
        a.userPW=document.getElementById("password").value;
        fetch(`${b.API_URL}/login`, {
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
            document.cookie="user="+data.id;
            this.props.change(data.id);
            alert("로그인 되었습니다.");
            window.location='/';
            sessionStorage.setItem("token",data.token);
        }
        else
        {
        alert("아이디가 존재하지 않거나 패스워드가 일치하지 않습니다.");
        }
        })
    }
    render()
    {
        return(
        <div className="pt-32 ml-auto mr-auto">
            <img className="block ml-auto mr-auto" src={Lawbot} alt="로봇사진"></img>
            <div className="bg-white shadow-md w-144 ml-auto mr-auto block rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="ID">
                    아이디
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ID" type="text" placeholder="ID"/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    패스워드
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </div>
                <div class="items-center justify-between">
                <button onClick={this.submit} class="block bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                로그인
                </button> 
                <button onClick={()=>{window.location.href="/register"}} class="mt-2 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                회원가입
                </button>     
                </div>
            </div>
        </div>
        );
    }
}
Login.contextType=MyContext;
export default Login;