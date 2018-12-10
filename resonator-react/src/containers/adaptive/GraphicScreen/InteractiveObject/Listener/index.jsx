import React from 'react';
//import PropTypes from 'prop-types'
import InteractiveObject from '../';
//now import assets
import AudioConfigurationHandler from 'containers/adaptive/AudioConfigurationHandler';
import {connect} from 'react-redux';
 class Listener extends React.Component {
     headImage = require('./listener.png');
     rippleImage = require('./ripples.png');
  constructor(props){
    super(props);

  }


   render(){
     var elStyle = {'position':'absolute', 'width':'60%','height':'60%', 'minHeight':'200px'};
     var headStyle ={'position':'absolute','height':'40%'};
     var rippleStyle ={'position':'absolute', 'left':'50%','top':'50%' ,'height':'100%', 'zIndex':'-1'};

     var content = (
          <div style = {this.props.style}>
            <img src = {require('./listener.png')} style = {headStyle} className ='centered' alt ="listener23" draggable = 'false'/>
            <img src = {require('./ripples.png')} style = {rippleStyle} className ='centered' alt ="ripple" draggable = 'false'/>
            {/*}<AudioConfigurationHandler/>*/}
          </div>
       );

       return <InteractiveObject style = {this.props.style} objectName = 'Listener'>{content}</InteractiveObject>;
     }
}



export default Listener;
