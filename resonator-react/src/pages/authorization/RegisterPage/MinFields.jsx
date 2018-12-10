import React from 'react'
import Paper from '@material-ui/core/Paper';

import RegisterPart from './RegisterPart.jsx';


class MinFields extends RegisterPart {
    constructor(props){
        super();
        this.state = {
          ...this.state,
            fields:{
              userName: props.fields.userName?props.fields.userName:''
            },
            errors: {
              userName:null,
            },
            warnings:{
              userName:null
            },
            isChipMinimized:{
              userName:true
            },
            openedChipsCount:0
        }
    }
    handleUserNameChange(event) {
      let warning = null,error = null;
      if(!(/^[A-Z][a-z]* [A-Z][a-z]*$/).test(event.target.value)){
          warning ='Full name is the preferred option!';
      }
      this.handleFieldChange('userName',error,warning,event.target.value);
    }
    conditionalRender(containerClasses, paperClasses, textFieldStyle_info, infoChip,bigScreen){
      let paperStyle=Object.assign(this.defaultPaperStyle(bigScreen,this.state.openedChipsCount),{maxWidth:'100%'});
      return(
        <div className={containerClasses} style={{overflowY:'auto',maxHeight:'100%',width:'100%'}}>
          <Paper className={paperClasses} style={paperStyle} elevation={1} >
              {this.chippedInputRender('userName','User Name','text',textFieldStyle_info,infoChip,this.handleUserNameChange.bind(this))}
              {this.buttonsRender(false,true)}
          </Paper>
        </div>
      );
    }
}

export default (MinFields);
