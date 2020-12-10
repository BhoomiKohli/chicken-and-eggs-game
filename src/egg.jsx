import React from 'react';
import egg from './egg.png';
class Egg extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <img className="egg" style={{marginLeft: this.props.left+'px', marginTop: this.props.top+'px'}} src= {egg}/>
        )
    }
}
export default Egg