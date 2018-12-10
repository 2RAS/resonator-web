
import React from 'react'
import {render} from 'react-dom'
import GraphicScreen from 'containers/adaptive/GraphicScreen/index'
import MultipleAudioPlayer from 'containers/adaptive/MultipleAudioPlayer/index';
import ListView from 'containers/adaptive/common/ListView'
import ConfigurationEditor from 'containers/adaptive/ConfigurationEditor';
import TrafficLight from 'containers/adaptive/GraphicScreen/InteractiveObject/TrafficLight'

import AudioConfigurationHandler from 'containers/adaptive/AudioConfigurationHandler'

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from 'store/reducers/musicReducer'
const musicstore = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class AdaptiveDemo extends React.Component{
   data = {comment:'hello'};
   files = ['/music/guitar.mp3','/music/drums.mp3','/music/bass.mp3','/music/rhytm_guitar.mp3'];
   trackNames =['guitar','drums','bass', 'rhytm_guitar'];
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
    var html = <div style = {{background:'grey', width:'100vw',height:'100vh',position:'absolute',top:0,left:0}}>

          <div style ={{ position:'absolute',height:'8vh',paddingBottom:'1vh',paddingTop:'1vh',paddingRight:'1vw',paddingLeft:'1vw',width:'98vw',background:'lightgrey',top:0,left:0}}>
            {/*listens on changes*/}
            <AudioConfigurationHandler />
            {/*audio output*/}
            <MultipleAudioPlayer files={this.files} vol={this.trackVolumes} trackNames ={this.trackNames} />
            <h1 style ={{ color:'dark',fontWeight:"400%"}}>Adaptive music demo</h1>
          </div>
          <div style ={{ position:'absolute',top:'10vh',left:'0px', width:'70%',height:'90vh'}}>
            <GraphicScreen graphicScreen={this.data} />
          </div>
          <ListView style={{ width:'30vw',height:'90vh',position:'absolute', top:'10vh', left:'70vw'}}>
              {configEditors}
          </ListView>
          <div id='transitionsEditor'>
          </div>

        </div>;

    return <Provider store ={musicstore} ><div>{html}</div></Provider>;
  }

};
export default AdaptiveDemo;
