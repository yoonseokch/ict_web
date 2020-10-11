import React,{Component} from 'react';
class judgement extends Component{
    myjudgement = () =>{
        var a={};
        a.User_ID=parseInt(document.cookie.split("=")[1]);
        a.Precedent_ID=this.props.id.ID;
        console.log(a);
        fetch('http://localhost:8080/analyze/myjudgement', {
            method: "POST",
            headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success)
            {
                alert("즐겨찾기에 추가하였습니다.");
            }
            else
            {
                alert("이미 즐겨찾기 되어있는 판례입니다");
            }
        })
    }
    submit = (e) =>{
        // function for opening judgement 
        var main = {OC:'ICTPoolC',
           target:'prec',
           ID: this.props.id.ID,
           type:'HTML'};
           fetch('http://www.law.go.kr/DRF/lawService.do?'+new URLSearchParams(main))
            .then((response)=>
            {    
                window.open(response.url);
            });
    }
    render()
    {
        return(
        <div className="pl-3 pt-1 h-16 inline-block w-full bg-white text-black srounded overflow-hidden  font-semibold rounded overflow-hidden shadow-lg">
        <p onClick={this.submit} className="inline-block w-1/4">
        #{this.props.id.ID}
        </p>
        <button onClick={this.myjudgement} className="float-right mt-2 mr-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>즐겨찾기</span>
        </button>
        </div>
        );
    }
}

export default judgement;