import React from 'react'
import Listener from './InteractiveObject/Listener'
import TrafficLight from './InteractiveObject/TrafficLight'
import Metro from './InteractiveObject/Metro'
import Dog from './InteractiveObject/Dog'
function GraphicScreen(props){
  const {graphicScreen} = props;

  return(
    <div style={{'position':'absolute','height':'100%','width':'100%',background:'#CEE',overflow:'hidden',boxShadow:'0 0 4px 4px rgba(0,0,0,0.5)'}}>
      <Listener style={{'position':'absolute','height':'50%','width':'auto', zIndex:'3'}}/>
        <TrafficLight style = {{position:'absolute',height:'15%', width:'15%',zIndex:'4'}}/>
        <Dog style = {{position:'absolute',height:'15%', width:'15%',zIndex:'4'}}/>
        <Metro style = {{position:'absolute',height:'15%', width:'15%',zIndex:'4'}}/>
    </div>

  )
}



export default GraphicScreen;
