import React from 'react'
// import Input from '@material-ui/core/Input'; // may be used

import './styles.css'
import 'styles/positioning.css'
import qs from 'qs'
class TextCheckBox extends React.Component{
  onChange(evt){
    this.props.onChange(!this.props.value)
  }
   render(){
    return (
    <span style={this.props.style}
          className ={this.props.className+' textCheckBox'+ (this.props.value?' textCheckBox-checked':' textCheckBox-unchecked')}
          onClick ={this.onChange.bind(this)}>
      {this.props.text}
    </span>);
  }

};
export default TextCheckBox;
