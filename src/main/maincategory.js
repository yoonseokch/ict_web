import React, { Component } from 'react';
class Maincategory extends Component {
    constructor(props){
        super(props);
        this.state = {
          imageLoadError: true,
        };
    }
    state={
        href:"",
        src: `../img/car.png`,
        images : []
    }
    componentDidMount(){
        this.setState({
            href:"/analyze?value="+this.props.index,
        })
    }
    render() {
        return (
            <div className="w-1/4"> 
            <a href={this.state.href} className="block rounded-full h-32 w-32 ml-auto mr-auto items-center justify-center bg-gray-200 rounded-full border">
                <img alt="1" className="mt-6 block w-1/2 ml-auto mr-auto pb-10" src={require(`../img/${this.props.value}.png`)} />
            </a>
            <p className="text-lg w-full text-center mt-2 font-bold">{this.props.value}</p>
            </div>
        );
    }
}

export default Maincategory;
