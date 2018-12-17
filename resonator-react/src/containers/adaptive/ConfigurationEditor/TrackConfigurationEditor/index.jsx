import React from 'react';
import SimpleSlider from '../../common/SimpleSlider'

import {connect} from 'react-redux';

import './styles.css'

 class TrackConfigurationEditor extends React.Component {

  constructor(props){
     super();
     this.state={
       parentState:props.parentState,
       trackName:props.trackName,
     }
     this.state.volume = props.states[this.state.parentState][this.state.trackName].volume;
  }
  onChangeVolume(value){
    this.props.onChangeVolume(this.state.parentState,this.state.trackName,value);
  }
  render(){
    return (
      <div className='TrackConfigurationEditor' style = {this.props.style}>
        <SimpleSlider value = {this.props.states[this.state.parentState][this.state.trackName].volume} label= {this.props.gainName} onChangeVolume ={this.onChangeVolume.bind(this)}
          style={{display:'inline-block'}}/>
        <span style={{color:'#117'}}> {this.props.states[this.state.parentState][this.state.trackName].volume} </span>
      </div>
    );
  }
}


const mapStateToProps = (state)=>{
  return {
    states:state.states,
    stateg:state.states.DefaultState.guitar.volume,
  }
}
const mapDispachToProps = (dispach)=>{
  return {
    onChangeVolume:(stateName, trackName, value)=>dispach({type:'STATE_CH_VOL', payload:{stateName:stateName, trackName:trackName, value:value}})
  };
}

export default  connect(mapStateToProps, mapDispachToProps) (TrackConfigurationEditor);
