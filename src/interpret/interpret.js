import React,{Component} from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class Interpret extends Component
{
    state = {
        file: null,
        image:"",
        page:1,
        explanation:""
    }
    increase = () =>{
        console.log(pdfjs.numPages);
        if (this.state.page!==pdfjs.numPages)
        {
        this.setState({
            page:this.state.page+1
        })
        }
    }
    interpret = (e,key) => {
        if (e.key!=="Enter")
        {
            return;
        }
        let data = encodeURIComponent(document.getElementById("input"));
        new Promise((resolve, reject)=> {
          let url = "https://openapi.naver.com/v1/search/encyc?query=" + data +"&display=3&sort=count";
          fetch(url, {
            method: "GET",
            headers: {
              "X-Naver-Client-Id" : "Akn5Y7uO9AQNtb21Xm6c",
              "X-Naver-Client-Secret" : "JnMgYfLhJE",
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then(res=>{
            if(res.status===200){
              return res.json();
            }}).then(json =>{
              //console.log("json",json.items[0].description)
              //this.setState({explanation : json.items[0].description})
              var array = [1,2,3];
              var target1 = "cid=42131&";
              var target2 = "cid=40942&";
              var found1 = false;
              var found2 = false;
              // var result = "";
              //var reg = "[^<]";
              var sol1,sol2,first
              for (var i in array) {
                if (json.items[i].link.indexOf(target1) !==-1){ 
                  //this.setState({explanation : "법률용어사전\n\n" + json.items[i].description});
                  //var end = json.items[i].link.indexOf('.');
                  sol1 = json.items[i].description.replace(/<\/b>/g, "");
                  sol2 = sol1.replace(/<b>/g, "");
                  first = sol2.split(".");
                  this.setState({explanation : "법률용어사전\n\n" + first[0]});
                  found1 = true;
                  break;
                }            
                else if (json.items[i].link.indexOf(target2) !== -1){
                  sol1 = json.items[i].description.replace(/<\/b>/g, "");
                  sol2 = sol1.replace(/<b>/g, "");
                  first = sol2.split(".");
                  this.setState({explanation : "두산백과\n\n" + first[0]});
                  found2 = true;
                  break;
                }
              }
    
              if(found1===false && found2===false){
                this.setState({explanation : "Not found"});
              }
              console.log(this.state.explanation);
            });
        });
      }
    onImageChange = (e) =>
    {
        console.log(e.target.files[0]);
        this.setState({
            file: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0])
        })
        console.log(this.state.file);
    }
    render()
    {
        return(
            <div className="w-full h-full bg-gray-100 py-10">
                <div className="shadow-xl ml-40 bg-white overflow-y-scroll h-full w-240 border-4 border-white rounded-lg pb-10">
                    <div className="relative w-192 object-center mr-0 pt-8 p-0 ml-auto mr-auto text-center mb-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">해석하고 싶은 문서를 올려주세요!</strong>
                        </div>
                        <input className="overflow-hidden pt-2 w-1/3" type="file" name="myImage" onChange={this.onImageChange} />
                        <Document scale={1.3} file={this.state.file}>
                            <Page pageNumber={this.state.page} scale="1.4" className="w-full overflow-x-scroll" />
                        </Document>
                    </div>
                </div>
                <div className="shadow-xl fixed bottom-0 mb-96 right-0 mr-32 w-96 bg-white">
                    <p className="block mt-4 w-4/5 ml-auto mr-auto text-gray-700 text-lg">용어</p>
                    <input type="text" id="input" className="bg-gray-100 h-8 pl-2 mt-1 text-lg w-4/5 ml-auto mr-auto block" placeholder="모르는 용어를 검색해 보세요" onKeyDown={this.interpret}></input>
                    <p className="block mt-4 w-4/5 ml-auto mr-auto text-gray-700 text-lg">정의</p>
                    <div id="result" className="bg-gray-100 text-lg break-all overflow-y-scroll h-32 w-4/5 ml-auto mr-auto mt-1 mb-6 pl-2 pt-2"></div>
                </div>
            </div>
            
        );
    }
}

export default Interpret;
