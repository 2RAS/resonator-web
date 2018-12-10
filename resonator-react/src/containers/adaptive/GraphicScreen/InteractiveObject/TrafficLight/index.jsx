import React from 'react';
import InteractiveObject from '../';

import trafficImage from './traffic.png'


class TrafficLight extends React.Component {

 constructor(props){
    super(props);
    var picStyle = {'position':'absolute','height':'100%'};
    this.content = <img src = {trafficImage} style = {picStyle} className ='centered' alt ="trafficLight" draggable ='false'/>
 }

 render(){
 return <InteractiveObject style = {this.props.style} objectName = 'TrafficLight'>{this.content}</InteractiveObject>;
 }
}

export default TrafficLight;
