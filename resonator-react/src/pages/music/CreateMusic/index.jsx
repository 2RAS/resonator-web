
import React from 'react'
import {render} from 'react-dom'
import GraphicScreen from 'containers/adaptive/GraphicScreen/index'
import MultipleAudioPlayer from 'containers/adaptive/MultipleAudioPlayer/index';
import ListView from 'containers/adaptive/common/ListView'
import ConfigurationEditor from 'containers/adaptive/ConfigurationEditor';
import TrafficLight from 'containers/adaptive/GraphicScreen/InteractiveObject/TrafficLight'

import AudioConfigurationHandler from 'containers/adaptive/AudioConfigurationHandler'
import PipelineElement from 'containers/adaptive/pipeline/Element'
import InteractiveObject from 'containers/adaptive/GraphicScreen/InteractiveObject'
import Draggable from 'react-draggable'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from 'store/reducers/musicReducer'
import './styles.css'
import {metalExample} from './example.js'
const musicstore = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class AdaptiveDemo extends React.Component{
   data = {comment:'hello'};
   files = ['/music/guitar.mp3','/music/drums.mp3','/music/bass.mp3','/music/rhytm_guitar.mp3'];
   trackNames =['guitar','drums','bass', 'rhytm_guitar'];
   config=metalExample;
   stateNames =['DefaultState','DangerState','AttentionState','NoisyState'];
   data = this.handleFiles
   changeVolume(trackNum,value){
     this.trackNames[trackNum].value =value;
   }


  render(){
    var configEditors=[];
    for(var i in this.stateNames) {
      configEditors.push(<ConfigurationEditor key={i} stateName={this.stateNames[i]} volumes={this.volumes} trackNames ={this.trackNames} />);
    }
    var pipelineElements = Object.keys(this.config.pipeline.elements).map((key)=>{
      let obj = this.config.pipeline.elements[key]
      alert(obj.type)
      return (
        <Draggable
          key={key}
          axis="both"
          handle=".handle"
          defaultPosition={{x: 200, y: 200}}
          position={null}

          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>
          <div className="handle">
            hello
          <PipelineElement type= {obj.type} id={key} style={{
              position:'absolute',
              width:'200px',height:'80px',
              right:'0',top:'0'}}>hello</PipelineElement>
          </div>
        </Draggable>
      )
    })
    var html = (
      <div style = {{background:'grey', width:'100%',height:'330vh',position:'absolute',top:0,left:0,overflowX:'hidden'}}>
        <div className='createAdvert-header' style = {{top:0}}>
          AUDIO PLAYER
        </div>
        <div style = {{background:'lightblue', width:'100%',height:'100vh',position:'absolute',top:'10vh',left:0}}>
          <div style ={{ position:'absolute',height:'8vh',paddingBottom:'1vh',paddingTop:'1vh',paddingRight:'1vw',paddingLeft:'1vw',width:'98%',background:'lightgrey',top:0,left:0}}>
            {/*listens on changes*/}
            <AudioConfigurationHandler />
            {/*audio output*/}
            <MultipleAudioPlayer files={this.files} vol={this.trackVolumes} trackNames ={this.trackNames} />
            <h1 style ={{ color:'dark',fontWeight:"400%"}}>Adaptive music demo</h1>
          </div>
          <div style ={{ position:'absolute',top:'10vh',left:'0px', width:'100%',height:'50vh'}}>
            <GraphicScreen graphicScreen={this.data} />
          </div>
        </div>
        <div className = 'createAdvert-header' style = {{top:'110vh'}}>
          PIPELINE BUILDER
        </div>
        <div style = {{background:'lightgreen', width:'100%',height:'100vh',position:'absolute',top:'120vh',left:0}}>
          <div style ={{
            position:'absolute',
            width:'100%',height:'70%',
            top:'0vh', left:'0',
            background:'#EFE',
            }}>
            {pipelineElements}
            {/*
            <PipelineElement type='gain' id='gain_1' style={{
                position:'absolute',
                width:'200px',height:'80px',
                right:'0',top:'0'}}></PipelineElement>
              <PipelineElement type='source' id ='source_1' url='some.mp3' style={{
                position:'absolute',
                width:'200px',height:'22%',
                left:'5px',bottom:'2%'}}></PipelineElement>
              <PipelineElement type='source' id ='source_2' url='some.mp3' style={{
                position:'absolute',
                width:'200px',height:'22%',
                left:'5px',bottom:'26%'}}></PipelineElement>
              <PipelineElement type='source' id ='source_3' url='some.mp3' style={{
                position:'absolute',
                width:'200px',height:'22%',
                left:'5px',bottom:'50%'}}></PipelineElement>
              <PipelineElement type='source' id ='source_4' url='some.mp3' style={{
                position:'absolute',
                width:'200px',height:'22%',
                left:'5px',bottom:'74%'}}></PipelineElement>
              <PipelineElement type='output' id ='output_1' style={{
                position:'absolute',
                width:'200px',height:'20%',
                right:'5px',bottom:'40%'}}></PipelineElement>
                */}
            </div>
          <ListView style={{ overflowY:'scroll',background:'#CBB',position:'absolute',
            width:'30%',height:'30%',
            right:'0',bottom:'0'}}>
              {configEditors}
          </ListView>

        </div>
        <div className = 'createAdvert-header' style = {{top:'220vh'}}>
          STATE CONFIGURER
        </div>
        <div style = {{background:'#F33', width:'100%',height:'100vh',position:'absolute',top:'230vh',left:0}}>
          <div style={{
            position:'absolute',
            width:'40vw',height:'8vh',
            top:'1vh', left:'30vw',
            background:'#CBB',
            border:'1vw solid #FEE',
            zIndex:'10',
            fontSize:'250%',
            textAlign:'center',
            boxShadow:'0 0 4px 3px rgba(0,0,0,0.2)'
          }}>STATES</div>

          <div style ={{
              boxShadow:'0px 0px 5px 5px rgba(0,0,0,0.1)',
              border:'3px solid #422',borderRadius:'20px',
              overflow:'hidden',
              position:'absolute',
              width:'90vw',height:'90vh',
              top:'7vh', left:'5vw'

              }}>
            <ListView style={{ overflowY:'scroll',background:'#CBB',position:'absolute',width:'100%',height:'100%'}}>
                {configEditors}
              </ListView>
          </div>
        </div>

      </div>);

    return <Provider store ={musicstore} ><div>{html}</div></Provider>;
  }

};
export default AdaptiveDemo;
