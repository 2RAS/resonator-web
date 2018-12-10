import React from 'react'
//import PropTypes from 'prop-types'

import {connect} from 'react-redux';
 class MultipleAudioPlayer extends React.Component {
  constructor(props){
    super();
    this.files = props.files;
    this.trackNames = props.trackNames
    this.audio = {};
    for(var i in this.files){
      this.audio[this.trackNames[i]] =React.createRef();
    }
    this.state= {
      currConfig:props.currConfig
    }
  }
 shouldComponentUpdate(nextProps, nextState){
   for (var name of this.trackNames){
     
      this.audio[name].current.volume=nextProps.currConfig[name].volume;
   }
 }
 start(){
  for (var name of this.trackNames){
     this.audio[name].current.volume=this.state.currConfig[name].volume;
     this.audio[name].current.play();
  }

 }
  renderAudio(i){
    return (
      <audio ref={this.audio[this.trackNames[i]]} mediagroup ='music'>
         <source src={this.files[i]}/>
      </audio>
    );
  }
  render(){
    var players =[];
    for(let i in this.trackNames)
      players.push(this.renderAudio.bind(this)(i));
    setTimeout(this.start.bind(this),10);
    return <div>{players}</div>;
  }
  /*shouldComponentUpdate(nextProps, nextState){

  }*/
}


const mapStateToProps = (state)=>{
  return {
    currConfig:state.currentConfig
  }
}
const mapDispachToProps = (dispach)=>{
  return {};
}

/*
MultipleAudioPlayer.propTypes = {
  num:PropTypes.number,
  files:arrayOf(propTypes.string),// used to pass mp3 files (links)
  vol:arrayOf(propTypes.number), //limits 0 to 100;
  mute_delayed:arrayOf(propTypes.bool) //if true - unmute on next keypoint. If true -mute;
};
*/

export default connect(mapStateToProps, mapDispachToProps) (MultipleAudioPlayer);
