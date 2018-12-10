import React from 'react';
import InteractiveObject from '../';

import dogImage from './dog.png'

import {connect} from 'react-redux';
class Dog extends React.Component {

 constructor(props){
    super(props);

 }

 render(){
   var picStyle = {'position':'absolute','height':'100%'};
   this.content = <img src = {dogImage} style = {picStyle} className ='centered' alt ="Dog" draggable ='false'/>
   return <InteractiveObject style = {this.props.style}  objectName = 'Dog'>{this.content}</InteractiveObject>;
 }
}


export default Dog;
