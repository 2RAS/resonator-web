import React from 'react'
//import PropTypes from 'prop-types'
import TrackConfigurationEditor from './TrackConfigurationEditor'

import './styles.css'

 class ConfigurationEditor extends React.Component {

  constructor(props){
    super();
    this.stateName =props.stateName;
    this.trackNames =props.trackNames;
    this.gainNames = props.gainNames;
    this.state={
      trackNames:props.trackNames
    }
  }

  render(){
    setTimeout((function(){ this.setState({...this.state,trackName1s: this.state.trackNames.map((name)=>{return 'SUB'+name;})});}).bind(this) , 3000)
    return (
      <div className = 'ConfigurationEditor'>
        <h2>{this.stateName}</h2>
        {this.trackNames.map((name,i)=>{return <TrackConfigurationEditor key={name} parentState = {this.stateName} gainName = {this.gainNames[i]}trackName = {this.trackNames[i]}/>},this)}
      </div>
    );
  }
}

/*
ConfigurationEdior.propTypes = {
  num:PropTypes.number,
  files:arrayOf(propTypes.string),// used to pass mp3 files (links)
  vol:arrayOf(propTypes.number), //limits 0 to 100;
  mute_delayed:arrayOf(propTypes.bool) //if true - unmute on next keypoint. If true -mute;
};
*/

export default ConfigurationEditor;
