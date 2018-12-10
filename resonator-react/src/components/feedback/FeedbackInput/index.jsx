import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StarRatingComponent from 'components/StarRatingComponent'
/*import Media from 'react-media'*/
import {connect} from 'react-redux'
import KeycloakUtils from 'classes/data/KeycloakUtils'
import FeedbackAPI from 'api/FeedbackAPI'
import FeedbackUtils from 'classes/data/FeedbackUtils'
const styles = {
    stars:{
      fontSize:'2.5em',
      paddingTop:'20px',
      paddingLeft:'15px',
    },
    root:{
      position:'relative',
      background:'white',
      height:'7em',
      padding:'0.1em',
      border:'1px solid lightgrey',

    },
    comment:{
      position:'inline-block',
      padding:'8px',
      border:'none',
      marginLeft:'10px',
    },
    commentContainer:{
      position:'relative',
      display:'inline-block',
      paddingLeft:'20px',
      paddingTop:'3px',
      top:'6px',
      overflow:'hidden',
      width:'calc(100% - 13em - 22px - 5em - 10px)'
    },
    buttonContainer:{
      position:'relative',
      display:'inline-block',
      padding:'2px',
      paddingLeft:'5px',
      paddingTop:'2em',
      paddingRight:'8px',
      overflow:'hidden',
      width:'5em',
      float:'right',
    },
    editableDiv:{
      display:'flex',
      alignItems:'flex-end',
      width:'auto',
      minWidth:'20em',
      height:'4em',
      margin:'1px',
      borderBottom: '3px solid #000',
      position:'relative',
      overflow:'hidden',
    },
    editableP:{
      position:'absolute',
      maxHeight:'100%',
      bottom:'0',
      left:'0',
      right:'0',
      margin:'0',
      padding:'0',
      overflow:'auto',
    }
  };

  class FeedbackInput extends React.Component{
      constructor(props){
        super(props);
        /*
          this.props.onAdded;
        */
        this.state={
          mark:3,
          comment:'someText',
          userId:undefined,
          username:undefined,
          userphoto:undefined,

          processing:false,
        }
      }
    handleStarsClicked(next, prev, name){
        this.setState({
          mark:next,
        })
    }
    handleCommentDivFocus(evt){/*
      evt.target.findElementsByClassName(this.props.classes.editableP)[0].focus();*/
    }
    handleCommentChange(evt){
      this.setState({
        comment:evt.target.innerText,
      })
    }
    handleSubmit(evt){
      this.props.keycloak.updateToken(30).then(()=>{
        this.setState({
          processing:true,
        },()=>FeedbackAPI.post(this.state.mark,
                               this.state.comment,
                               FeedbackUtils.convertDate(new Date()),
                               this.props.userId,
                               this.props.userRole,
                               this.props.advertId,
                               this.props.keycloak.token).then(
              ()=>{
                  this.setState({
                    processing:false,
                  })
                  if(this.props.onSubmit)this.props.onSubmit(this.state);
                }
              )
        )
      });

    }
    handleLogin(){
      this.props.keycloak.login();
    }
    render(){

      let stars = (
        <StarRatingComponent
          className={this.props.classes.stars}
          name={'review rating'} /* name of the radio input, it is required */
          onStarClick={this.handleStarsClicked.bind(this)}
          value={this.state.mark} /* number of selected icon (`0` - none, `1` - first) */
          starCount='5' /* number of icons in rating, default `5` */
          starColor={'#ffb400'} /* color of selected icons, default `#ffb400` */
          emptyStarColor={'#333'} /* color of non-selected icons, default `#333` */
          editing={true} /* is component available for editing, default `true` */
          />
      );
      if(!KeycloakUtils.getUserInfo(this.props.keycloak).user_id)
        return (
            <div style={{height:"2em", textAlign:"center"}} onClick={this.handleLogin.bind(this)} className={this.props.classes.root}>
              login to add a comment!
            </div>
        )
      if(this.state.processing)
        return (
            <div style={{height:"2em", textAlign:"center"}} className={this.props.classes.root}>
              Your comment is flying through the wires...
            </div>
        )
      return (
        <div className={this.props.classes.root}>
          <div style={{display:'inline-block',position:'static',width:'12em'}}>
            {stars}
            <div style={{display:'block',position:'relative',textAlign:'right',width:'100%'}}>
              <span style={{fontSize:'1em',fontWeight:'600'}}>comment:</span>
            </div>
          </div>
          <div className={this.props.classes.commentContainer}>
            <div className={this.props.classes.editableDiv} onFocus={this.handleCommentDivFocus.bind(this)}>
                <p className={this.props.classes.editableP}
                  autofocus onFocus={(evt)=>evt.stopPropagation()}
                  contentEditable="true"
                  onInput={this.handleCommentChange.bind(this)}
                  ><br/></p>
              </div>
            </div>
            <div className={this.props.classes.buttonContainer}>
              <Button  onClick={this.handleSubmit.bind(this)}>
                Submit!
              </Button>
            </div>
          </div>
      );
    }
  }

    FeedbackInput.propTypes = {
      classes: PropTypes.object.isRequired,
      userId: PropTypes.string,
      userRole: PropTypes.string,
      advertId: PropTypes.string
    };
/*
this.props.data={
  author:
  recepient:
  comment:
  mark:
  dateTime:
  rentedFrom:
  rentedTo:
  rentedItem:

}
*/
const mapStateToProps = (state)=>{
  return {
    keycloak:state.security.keycloak,
    kcAuthenticated:state.security.authenticated,
    kcInitialized:state.security.initialized
  }
}
    export default connect(mapStateToProps)(withStyles(styles)(FeedbackInput));
