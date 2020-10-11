import React, { Component } from 'react';
class Maincategory extends Component {
    state={
        href:""
    }
    componentDidMount(){
        this.setState({
            href:"/analyze?value="+this.props.index
        })
    }
    render() {
        return ( 
            <a href={this.state.href} className="block rounded-full h-32 w-32 ml-10 flex inline-block items-center justify-center bg-gray-200 rounded-full border">
                {this.props.value}
            </a>
        );
    }
}

export default Maincategory;
