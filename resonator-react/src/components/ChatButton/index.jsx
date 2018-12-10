import React from 'react';

import 'styles/positioning.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import MESSAGE_ICON from 'media/message.png'
import qs from 'qs'
const styles = theme => ({
  root: {
    display:'block',
    position:'fixed',
    bottom:'10px',
    right:'10px',
    height:'100px',
    width:'100px',
    backgroundColor:'#DFD',
    borderRadius:'50%',
  },
  image:{
    height:'100%',
    width:'100%',
  }
})
class ChatButton extends React.Component{
  constructor(props){
    super();
  }
  handleClick(evt){
    if(this.props.userId && this.props.history){
      let params=qs.stringify({userid:this.props.userId})
         this.props.history.push({
           pathname: '/chat',
           search: params,
           state: {},
         });
    }else if(this.props.history){
      alert('wait for user to be loaded');
    } else{
      alert('someone broke this page..., add history to props')
    }
  }
  render(){
      return (
        <div onClick ={this.handleClick.bind(this)} className={this.props.classes.root+' '+(this.props.className?this.props.className:'')} style={ this.props.style}>
            <img alt= "start chat!" className={this.props.classes.image} src={MESSAGE_ICON}></img>
        </div>
      )
    }
  }


//minimized - only on creation
//visible - can be changed

ChatButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatButton);
