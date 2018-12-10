import React from 'react';
import InteractiveObject from '../';
import metroImage from './metro.png'


import {connect} from 'react-redux';
class Metro extends React.Component {

 constructor(props){
    props = Object.assign({}, props, {pic: require('./metro.png')});
    super(props);
    var picStyle = {'position':'absolute','height':'100%'};
    this.content = <img src = {metroImage} style = {picStyle} className ='centered' alt ="metro" draggable ='false'/>
 }

 render(){
   return <InteractiveObject style = {this.props.style} objectName = 'Metro'>{this.content}</InteractiveObject>;
 }
}


export default Metro;
