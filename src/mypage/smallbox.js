import React, { Component } from 'react';
class Smallbox extends Component {

    render() {
        return (
            <div className="rounded-sm w-2/5 bg-gray-100 h-20 mr-10 overflow-x-scroll">
            <div className="ml-5">
            <footer className="text-base mt-2 text-gray-700">{this.props.name}</footer>
            <p className="block text-xl mt-1 font-semibold">{this.props.data}</p>
            </div>
            </div>
        );
    }
}

export default Smallbox;
