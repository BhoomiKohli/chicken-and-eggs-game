import React from 'react';
import basket from './basket.png';

class Moves extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <img className= "basket" style={{marginLeft: this.props.left +'px'}} id="id1" src= {basket}/>)
      }
}
export default Moves