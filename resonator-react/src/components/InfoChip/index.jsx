import React from 'react';

import 'styles/positioning.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
  infoChip:{
    width:'1.2em',
    height:'1.2em',
    borderRadius:'0.6em',
    border:'10px solid lightred',
    backgroundColor:'red',
    textAlign:'center',
    verticalAlign:'middle',
  },
  infoChip_squared:{
    borderRadius:'2px'
  }
})
class InfoChip extends React.Component{
  constructor(props){
    super();
  }
  showInfo(){
    if (this.props.showAlert===true){
      alert(this.props.info);
    }else{
      if(this.props.onMaximize)this.props.onMaximize();
    }
  }
  hideInfo(){
    if (this.props.showAlert===true){
      alert(this.props.info);
    }else{
      if(this.props.onMinimize)this.props.onMinimize();
    }
  }

  render(){
    let content ='';
    let classes =[];
    let styles ={color:'black',borderColor:'black',backgroundColor:'grey'};
    let onclick;
    switch(this.props.type) {
      case 'confirmation':
          styles.borderColor = 'green';
          styles.backgroundColor='lightgreen';
          content =':)';
          break;
      case 'warning':
          styles.borderColor = 'black';
          styles.backgroundColor='yellow';
          content=':|';
          break;
      case 'error':
          styles.borderColor = 'red';
          styles.backgroundColor='lightred';
          content=':(';
          break;
      default:
          styles.borderColor = 'black';
          styles.backgroundColor='grey';
    }
    classes.push(this.props.classes.infoChip_minimized);
    classes.push(this.props.classes.infoChip);
    if(this.props.squared)classes.push(this.props.classes.infoChip_squared);
    if(this.props.minimized){
        classes.push('unselectable');
        styles.width='1.2em';
        onclick=this.showInfo.bind(this);
        styles.fontSize=this.props.size;
      }else{
        content=this.props.info;
        onclick=this.hideInfo.bind(this);
        styles.maxWidth=this.props.fullWidth;
        styles.fontSize='1em';
        styles.padding='1em';
        styles.width=this.props.fullWidth;
        styles.display='inline';
      }
      return (
        <div onClick ={onclick} className={classes.join(' ')} style={Object.assign(styles, this.props.style)}>
          {content}
        </div>
      )
    }
  }


//minimized - only on creation
//visible - can be changed

InfoChip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoChip);
