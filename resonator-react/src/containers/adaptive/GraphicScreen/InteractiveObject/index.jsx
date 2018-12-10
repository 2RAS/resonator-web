import React from 'react';
import './styles.css'
//import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
//now import assets
import {connect} from 'react-redux'
 class InteractiveObject extends React.Component {
        //should be a pictrue
     radius = 100;
  constructor(props){
    super(props);
    this.pic = props.pic;
    this.radius = props.radius;
    this.objectName = props.objectName;
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  handleDrag =(e: MouseEvent, data: Object) => {
    this.props.onChangePosition(data.x,data.y,this.objectName);
  }
  render(){
    var elStyle =   {'position':'absolute', 'width':'60%','height':'60%', 'minHeight':'200px'};
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 200, y: 200}}
        position={null}

        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>

       <div style = {this.props.style} className="handle">
          {this.props.children}
        </div>
      </Draggable>

    );
  }
}
const mapStateToProps = (state)=>{
  return {

  }
}
const mapDispachToProps = (dispach)=>{
  return {
    onChangePosition:(x, y,objectName)=>dispach({type:'CH_OBJ_POS', payload:{objectName:objectName, x:x, y:y}})
  };
}
export default connect(mapStateToProps, mapDispachToProps) (InteractiveObject);
