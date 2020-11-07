import React,{Component} from 'react';
import {MyContext} from '../context.js';

class Analyze extends Component{
    state={
        useImage : true,
        image : null,
        submit : false
    }
    componentDidMount(){

    }
    analyze = (event) =>{
        let img = document.getElementById("input").elements[0].files[0];
        
        this.setState({
          image: URL.createObjectURL(img)
        });
        console.log(img);
        let data = new FormData();
        data.append('temp', img);
        console.log(data);
        let b=this.context;
        fetch(`http://localhost:8080/user/profile`, {
        method: "PUT",
        body: data,
        headers: {
            'token': `${sessionStorage.getItem('token')}`,
          // 'Content-Type': 'multipart/form-data',
          //  'Accept': 'application/json',
        },
        }).then((result) => {
        return result.json();
        }).then((data)=>{
            console.log(data);
        })
    }
    render()
    {
        if (!this.state.submit)
        {
        return(
        <div className="bg-gray-100 w-full py-10"> 
        <div className="shadow-xl bg-white w-240 pb-10 ml-auto mr-auto border-4 border-white rounded-lg"> 
        <div className="relative w-192 object-center mr-0 pt-8 p-0 ml-auto mr-auto text-center mb-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">원고의 기준에서 소장을 작성해주세요!</strong>
        </div>
        <div className="bg-red-100 border border-red-400 mt-8">
        {this.state.useImage && 
        <form id="input">
            <input className="pt-2 w-1/3 overflow-hidden" type="file" name="myImage" onChange={this.onImageChange} />
            <img src={this.state.image} alt="1" ></img>
        </form>}

        <button onClick={this.analyze} className="mb-3 bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 m-0 rounded ">유사판례 분석</button>
        </div>
        
        </div>
        </div>
        </div>
        );
        }
    }
}
Analyze.contextType=MyContext;
export default Analyze;