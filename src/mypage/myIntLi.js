import React, { Component } from 'react';
class IntLi extends Component {
    render() {
        return ( 
            <div className="inline-block border rounded-md w-2/5 mr-2 mt-3 pt-2 pb-2 bg-red-700 ml-8 text-white h-10 pl-3 font-bold ">
                {this.props.content}
                <button value={this.props.content} onClick={this.props.onClick} className="float-right mr-3">x</button>
            </div>
        );
    }
}

export default IntLi;
