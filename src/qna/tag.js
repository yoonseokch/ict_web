import React, { Component } from 'react';
class Tag extends Component {
    render() {
        return ( 
            <div className="inline-block border rounded-md mr-2 mt-3 pt-2 pb-2 bg-red-700 ml-8 text-white h-10 pl-3 font-bold ">
                <p className="text-white inline-block">{this.props.content}</p>
                <div className="text-white inline-block px-3" onClick={this.props.onClick}>x</div>
            </div>
        );
    }
}

export default Tag;
