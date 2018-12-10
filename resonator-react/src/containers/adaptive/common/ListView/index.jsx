import  React from 'react';
import './styles.css'


class ListView extends React.Component{
  styles = require('./styles.css');
  render(){
    return (
      <div className = 'ListView' style ={this.props.style}>
        {this.props.children.map((e)=>e)}
      </div>
    )
  }
}

export default ListView;
