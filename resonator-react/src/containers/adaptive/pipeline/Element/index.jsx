import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Gain from './type/gain'
import Source from './type/source'
import Output from './type/output'
 class PipelineElement extends React.Component {
  constructor(props){
    super();
    if(props.type === 'gain')
     this.model = new Gain(props.id, (props.gain?props.gain:1))
    else if(props.type == 'source')
      this.model = new Source(props.id, props.source)
    else if(props.type == 'output')
      this.model = new Output(props.id, props.source)
  }
  handleInputClicked(name){
    alert('input clicked')
  }
  handleOutputClicked(name){
    alert('output clicked')
  }
  render(){
    let inputs=this.model.inputs.map(input=>{
      return (
        <button key={input} onClick={()=>this.handleInputClicked(input)} style={{
          width:'100%',textAlign:'center',fontSize:'80%',border:'0',padding:'0px',height:(100/this.model.inputs.length)+'%',
          background:'lightgreen',
        }}>
          {input}
        </button>
      )
    });
    let outputs=this.model.outputs.map(output=>{
      return (
        <button key ={output} onClick={()=>this.handleOutputClicked(output)} style={{
          width:'100%',textAlign:'center',fontSize:'80%',border:'0',padding:'0px',height:(100/this.model.outputs.length)+'%',
          background:'lightgreen',
        }}>
          {output}
        </button>
      )
    })

    return (
      <div className={this.props.className} style={{...this.props.style,borderRadius:'10px',overflow:'hidden'}}>
        <div style={{
          position:'absolute',
          top:'0',left:'0',
          width:'50px',
          height:'100%',
          background:'lightgrey',
        }}>{inputs}</div>
        <div style={{
          position:'absolute',
          top:'0',
          left:(this.model.inputs.length!==0)?'50px':'0',
          right:(this.model.outputs.length!==0)?'50px':'0',
          background:'white',
          height:'calc(100% - 16px)',
          padding:'5px',
          borderTop:'3px solid lightgreen',
          borderBottom:'3px solid lightgreen',
        }}>
        <div style={{
          position:'absolute',
          top:'0',left:'0',right:'0',
          height:'calc(30% - 10px)',
          color:'white',
          background:'green',
          boxShadow:'0 0 2px 2px rgba(0,0,0,0.2)',
          fontSize:'70%',
          padding:'5px',
        }}>
          <b>{this.model.type}: </b>{this.model.id}
        </div>
        <div style={{
          position:'absolute',
          bottom:'0',left:'0',right:'0',
          height:'calc(70% - 10px)',
          fontSize:'50%',
          padding:'5px',
        }}>

        </div>
        </div>

        <div style={{
          position:'absolute',
          top:'0',right:'0',
          width:(this.model.outputs.length!==0)?'50px':'0',
          height:'100%',
          background:'lightgrey',

        }}>{outputs}</div>
      </div>
    )
  }
}
export default PipelineElement
