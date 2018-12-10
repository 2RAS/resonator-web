import React from 'react';
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'

 class AudioConfigurationHandler extends React.Component {
        //should be a pictrue
     radius = 100;
  constructor(props){
    super(props);
    this.states = props.states;
    }
closest='Listener';

  shouldComponentUpdate(nextProps, nextState){

    var distance = 10000.0;
    this.closest = 'Listener'; //that means no other objects around;
    var temp;
    for(var i in nextProps.objectPosition){
      if(i === 'Listener') continue;
      temp = (Math.pow(nextProps.objectPosition[i].x-nextProps.objectPosition.Listener.x, 2)
            +Math.pow(nextProps.objectPosition[i].y-nextProps.objectPosition.Listener.y, 2));
            if(temp < distance){ distance =temp; this.closest = i;}
    }
    var desiredState = nextProps.objectStateMap[this.closest];
    var config = {...nextProps.currentConfig};
    var changed = false;
    for(var i in nextProps.currentConfig){
      if((nextProps.states[desiredState][i].volume - nextProps.currentConfig[i].volume)>0.03){
          changed = true;
            config= {...config,[i]:{...config[i], volume:config[i].volume+0.02}} //  (nextProps.states[desiredState][i].volume)
      } else if((nextProps.states[desiredState][i].volume - nextProps.currentConfig[i].volume) < -0.03){
          changed = true;
            config={...config,[i]:{...config[i], volume:config[i].volume-0.02}}
      }
    }

    if(changed){
      setTimeout(()=>{nextProps.onChangeCurrentConfiguration(config)},50);
    }
    //super.shouldComponentUpdate(nextProps,nextState);
    return true;
  }
  render(){
    return <div some ={this.props.states} style={{ top:0, left:0, background:'white',height:'400px',width:'400px',zIndex:100}}> <h1>{this.closest}</h1></div>
  }
}
const mapStateToProps = (state)=>{
  return {
    states:state.states,
    objectPosition:state.objectPosition,
    objectStateMap:state.objectStateMap,
    currentConfig:state.currentConfig
  }
}
const mapDispachToProps = (dispach)=>{
  return {
    onChangeCurrentConfiguration:(config)=>dispach({type:'CH_CURR_CONF', payload:config})
  };
}
export default connect(mapStateToProps, mapDispachToProps)(AudioConfigurationHandler);
