import React,{Component} from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import {MyContext} from '../context.js';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class Interpret extends Component
{
    state = {
        file: null,
        image:"",
        page:[],
        explanation:""
    }
    onDocumentLoadSuccess= (Page) => {
        var a=[];
        for (var i=0;i<Page.numPages;i++)
        {
            a.push(i+1);
        }
        this.setState({page:a});
    }
    interpret = (e,key) => {
        if (e.key!=="Enter")
        {
            return;
        }
        var data={
            query : document.getElementById("input").value
        };
        var b=this.context;
        console.log(data);
        fetch(`${b.API_URL}/interpret`,{
            method : 'POST',
            headers : {
                token : sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body :JSON.stringify(data)
        }).then(res => res.json())
        .then ((data)=>{
            document.getElementById("result").innerHTML=data.data;
            if (data.data==="")
            {
                document.getElementById("result").innerHTML="관련 정보를 찾을수 없습니다";
            }
        })
      }
    onImageChange = (e) =>
    {
        this.setState({
            file: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0])
        })
    }
    render()
    {
        return(
            <div className="w-full h-full bg-gray-100">
                <div className="mt-8 float-left shadow-xl w-1/2 bg-white overflow-y-scroll h-192 border-4 border-white rounded-lg pb-10">
                    <div className="relative w-192 object-center mr-0 pt-8 p-0 ml-auto mr-auto text-center mb-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">해석하고 싶은 문서를 올려주세요!</strong>
                        </div>
                        <input className="overflow-hidden pt-2 w-1/3" type="file" name="myImage" onChange={this.onImageChange} />
                        <Document id="input1" scale={1.3} file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess}>
                        {this.state.page.map((num) => (
                            <Page pageNumber={num} key={num} scale={1.4} className="w-full overflow-x-scroll" />
                          ))}
                        </Document>
                    </div>
                </div>
                <div className="mt-8 w-1/2 float-left shadow-xl bg-white h-192 border-4 border-white rounded-lg">
                    <p className="block mt-8 w-4/5 ml-auto mr-auto text-gray-700 text-lg">용어</p>
                    <input type="text" id="input" className="bg-gray-100 h-8 pl-2 mt-1 text-lg w-4/5 ml-auto mr-auto block" placeholder="모르는 용어를 검색해 보세요" onKeyDown={this.interpret}></input>
                    <p className="block mt-4 w-4/5 ml-auto mr-auto text-gray-700 text-lg">정의</p>
                    <div id="result" className="bg-gray-100 text-lg break-all overflow-y-scroll h-96 w-4/5 ml-auto mr-auto mt-1 mb-6 pl-2 pt-2"></div>
                </div>
            </div>
            
        );
    }
}
Interpret.contextType=MyContext;
export default Interpret;
