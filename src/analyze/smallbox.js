import React,{Component} from 'react';
class smallbox extends Component{
    render()
    {
        return(
            <div className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{this.props.contents}</div>
        );
    }
}

export default smallbox;