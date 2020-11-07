import React, { Component } from 'react';
class IntLi extends Component {
    render() {
        return ( 
            <li onClick={this.props.onClick} className="relative z-1 block w-full pt-2 text-gray-700 h-10 bg-gray-100 pl-5  hover:bg-indigo-700 hover:text-white">
                {this.props.content}
            </li>
        );
    }
}

export default IntLi;
