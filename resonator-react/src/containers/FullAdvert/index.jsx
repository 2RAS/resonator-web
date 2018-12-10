import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'components/StarRatingComponent'
import Media from 'react-media'
import FeedbackUtils from 'classes/data/FeedbackUtils'
import AdvertFeedback from 'components/feedback/AdvertFeedback'
import ImageLoader from 'components/ImageLoader'
import ImageLoaderImage from 'components/ImageLoader/Image'
import 'styles/positioning.css'
import AdvertAPI from 'api/AdvertAPI'
import UserAPI from 'api/UserAPI'
import MessageButton from 'components/ChatButton'

const styles = {
    root:{
    },
    advertFeedback:{
      width:'100%',
      maxWidth:'899px',
      maxWidth:'750px',
      background:'lightgrey',
      /*border:'1px solid grey',*/
      /*boxShadow:'inset 0px 0px 3px 3px white'*/
      margin:'0 auto',
      marginBottom:'10px',
      borderTopLeftRadius:'10px',
      borderTopRightRadius:'10px',
      overflow:'hidden',
    },
    advertFeedbackList:{
      maxHeight:'400px',
      paddingTop:'40px',
    },
    content:{
      padding:'10px',
      paddingTop:'0px',
    },
    imageLinks:{
      position:'relative',
      top:'0',
      left:'0',
      width:'100%',
      border:'none',
      padding:'0',
      margin:'0',
    },
    imageLinksImage:{
      height:'auto',
      minHeight:'100%',
      maxHeight:'140%',
      width:'100%',
      border:'none',
      padding:'0',
      margin:'0',
      marginTop:'0',
      marginBottom:'0',
      borderRadius:'0',
      marginRight:'0',
      marginLeft:'0',
    },
    imageLinksDropzone:{
      overflowY:'hidden',
      height:'40vw',
      width:'100%',
      border:'none',
      padding:'0',
      margin:'0',
    },
    imageLinksContainer:{
      top:'0',
      height:'100%',
      border: 'none',
      padding:'0',
      margin:'0',
      paddingTop:'0',
      marginTop:'0',
      paddingBottom:'0',
      marginBottom:'0',
    },
    secondInfo:{
      display:'flex',
      fontSize:'1.2em',
      paddingLeft:'100px',
      paddingRight:'100px',
    },
    thirdInfo:{
      minWidth:'90%',
      maxWidth:'100%',
      width:'800px',
      fontSize:'1.2em',
      margin:'0 auto',
    },
    authorPhoto:{
      height:'100px',
      width:'100px',
      display:'inline-block',
      borderRadius:'50%',
      border:'none',
      marginLeft:'0',
      marginRight:'0',
      border:'none'
    },
    info:{
      marginBottom:'20px',
      marginTop:'10px'
    },

  };

  class FullAdvert extends React.Component{
      constructor(props){
        super(props);
        this.state={
          advert:undefined,
          author:{
            keycloak:undefined,
            additional:undefined
          }
        }
        this.getAdvertByID(this.props.id);
      }
      getUserById(id){
         UserAPI.getKeycloakUserInfo(id).then(result =>{
           this.setState({
              author:{
                ...this.state.author,
                keycloak:result,
              }
           });
         });
         UserAPI.getAdditionalUserInfo(id).then(result =>{
           this.setState({
              author:{
                ...this.state.author,
                additional:result,
              }
           });
          });
      }
      getAdvertByID(id){
          AdvertAPI.getAdvertById(id).then(result =>{
             this.setState({
                advert:result,
             });
             this.getUserById(result.usersId);
           });
      }
    render(){
      let contents = 'wait for it...';

      if(this.state.advert){
        contents = (
          <div>
            <div>
              {this.state.advert.imageLinks?<ImageLoader
                readOnly={true}
                imageLinks={this.state.advert.imageLinks}
                className={this.props.classes.imageLinks}
                dropzoneClassName={this.props.classes.imageLinksDropzone}
                imageClassName={this.props.classes.imageLinksImage}
                containerClassName={this.props.classes.imageLinksContainer}/>:''}
                {/*{this.state.advert.mainLink}*/}

            </div>
            <hr style={{margin:'0'}}></hr>
            <div className={this.props.classes.content}>
              <div style={{display:'flex'}}>
                  <h1 style={{flex:'75%',margin:'2px',padding:'5px'}}>{this.state.advert.name}</h1>
                  <div style={{display:'inline-block',background:'#eee',textAlign:'center',verticalAlign:'middle', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                    <h3 style={{flex:'25%',margin:'10px',marginTop:'15px',color:'darkred'}}>Price: {this.state.advert.price+' '+ (this.state.advert.currency?this.state.advert.currency:'acp')}/day
                    </h3>
                 </div>
              </div>

              <div className = {this.props.classes.firstInfo} style={{marginLeft:'10px'}}>
                <span style={{display:'inline-block',fontSize:'1.2em',fontWeight:'bolder'}}>{this.state.advert.location?this.state.advert.location:'-'}</span>
                <span style={{marginLeft:'1em', fontSize:'1.4em',color:'lightgrey',marginRight:'1em'}}>|</span>
                <span style={{display:'inline-block',fontSize:'1.2em',color:'grey'}}>Created:  {(new Date(this.state.advert.date)).toLocaleString()}</span>
              </div>
              <hr style={{border:'1px solid lightgrey'}}></hr>
              <div className = {this.props.classes.secondInfo}>
               <div style={{flex:'50%'}}>
                 <div>
                   <span style={{color:'grey'}}>Category:</span> {this.state.advert.category?this.state.advert.category:'-'}
                 </div>
                 <div>
                   <span style={{color:'grey'}}>Location:</span> {this.state.advert.location?this.state.advert.location:'-'}
                 </div>
               </div>
               <div style={{flex:'50%'}}>
                  <div>
                     <span style={{color:'grey'}}>Minimum renting time:</span>  {((this.state.advert.numb_of_hours>=24)?Math.floor(this.state.advert.numb_of_hours/24)+((this.state.advert.numb_of_hours>=48)?' days ':' day '):'')+(this.state.advert.numb_of_hours%24?this.state.advert.numb_of_hours%24+' hours.':'')}
                  </div>
                </div>
              </div>
              <hr style={{border:'1px solid lightgrey'}}></hr>
              <div className ={this.props.classes.thirdInfo}>
                <span className={this.props.classes.info} style={{color:'grey'}}>Info:</span> {this.state.advert.info}
              </div>
              <hr style={{border:'1px solid lightgrey'}}></hr>
              <div style={{color:'blue'}}>
                 {this.state.author.additional?this.state.author.additional.photo?(
                  <ImageLoaderImage
                    className ={this.props.classes.authorPhoto}
                    imageClassName={this.props.classes.authorPhoto}
                    viewOnly={true}
                    imageLink={[this.state.author.additional.photo]}/>
                ):'':''}
                <div style={{display:'inline-block'}}>
                  <span style={{color:'grey'}}>Author:</span> {this.state.author.keycloak?(this.state.author.keycloak.firstName+' '+this.state.author.keycloak.lastName):'loading'}
                   <br/>
                  {/*<span style={{color:'grey'}}>Average Rating:</span> {this.state.author.keycloak?(this.state.author.keycloak.firstName+' '+this.state.author.keycloak.lastName):'loading'}  */}
                </div>
              </div>
              <div>
                <br/>
              </div>
              <br/>
              <AdvertFeedback
                 caption = 'feedback'
                 className ={this.props.classes.advertFeedback}
                 listClassName={this.props.classes.advertFeedbackList}
                 advertId ={this.props.id}
                 userId = {this.state.author.keycloak?this.state.author.keycloak.id:undefined}
                 userRole = 'GIVER'/>
              </div>
              <MessageButton
                history={this.props.history}
                userId ={this.state.advert.usersId}></MessageButton>
         </div>
        )
      }
      return (
          <Paper className={this.props.classes.root+' '+this.props.className} style={this.props.style}>
            {contents}
          </Paper>
      );
    }
  }

    FullAdvert.propTypes = {
      classes: PropTypes.object.isRequired,
    };
/*
this.props.id
*/

    export default withStyles(styles)(FullAdvert);
