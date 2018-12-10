import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'components/StarRatingComponent'
import Media from 'react-media'
const styles = {
  card: {
    maxWidth: '100%',
  },
  stars:{
    fontSize:'1.8em',
  },
  starsContainer:{
    height:'100%',
    padding:'10px',
    paddingLeft:'30px',
    verticalAlign:'middle',
  },
  rentedField:{
    color:'darkblue',
    fontWeight:'bold',
    fontSize:'0.8em'
  },
  ups:{
    padding:'10px',
    marginLeft:'auto'
  },
  media: {
      height: '100%',
    },
  };

  class Feedback extends React.Component{
      constructor(props){
        super(props);
        this.upped=this.props.data.isLiked;
        this.liked=this.props.data.likes;
      }
    renderBottomLine(){
    return <p className={this.props.classes.rentedField}>
            {(this.props.data.rentedItem)?(
               <span>
                  About <span style={{color:'green'}}>{this.props.data.rentedItem+' '}</span>
                  {(this.props.data.rentedFrom && this.props.data.rentedTo)?(
                    <span>
                      (Rented from <span style={{color:'green'}}> {this.props.data.rentedFrom} </span>
                      to <span style={{color:'green'}}> {this.props.data.rentedTo}</span>)
                    </span>):''
                  }
                </span>):(
                <span>
                  {(this.props.data.userAbout)?(
                     <span>About <span style={{color:'green'}}> {this.props.data.userAbout.firstName+' '+this.props.data.userAbout.lastName}</span></span>):(
                     <span>Lost Feedback!</span>)
                  }
                </span>)
            }
          </p>
    }
    render(){

      var {classes} = this.props;
      let stars = (
        <StarRatingComponent
          className={this.props.classes.stars}
          name={'review rating'} /* name of the radio input, it is required */
          value={this.props.data.mark} /* number of selected icon (`0` - none, `1` - first) */
          starCount={5} /* number of icons in rating, default `5` */
          starColor={'#ffb400'} /* color of selected icons, default `#ffb400` */
          emptyStarColor={'#333'} /* color of non-selected icons, default `#333` */
          editing={false} /* is component available for editing, default `true` */
          />
      );
      let ups = (
        <IconButton
            className={this.props.classes.ups}
            onClick={(()=>{
              this.upped=!this.upped;
              this.forceUpdate()
              if(this.upped)this.liked+=1;
              else this.liked-=1;
            })}
            >
          <ThumbUpIcon color={this.upped?'primary':'disabled'}/>
          <span style={{color:(this.upped?'darkblue':'darkgrey')}}>{this.liked}</span>
        </IconButton>
      );
      return (
        <Card className={classes.card} style={{...{margin:'15px'}, ...this.props.style}}>

          <CardActionArea style={{width:'100%'}}>
            <CardHeader style={{marginBottom:'0px',paddingBottom:'0px'}}
                avatar={
                   <Media query="(min-width: 721px)">
                     <Avatar aria-label="Recipe" className={classes.avatar}>
                       {this.props.data.userLeft.firstName?this.props.data.userLeft.firstName[0]:' '}
                     </Avatar>
                   </Media>
                }
                action={
                  <Media query="(min-width: 351px)">
                    <div className={this.props.classes.starsContainer}>
                      {stars}
                    </div>
                  </Media>
                }
                title={this.props.data.userLeft?this.props.data.userLeft.firstName+' '+this.props.data.userLeft.lastName:'unknown user'}
                subheader=<div>
                  <Media query="(max-width: 350px)">
                    {stars}
                  </Media>
                  <Media query="(min-width: 351px)">
                    <span>{this.props.data.dateTime}</span>
                  </Media>
                </div>
                />
              <CardContent >
              <Typography gutterBottom variant='inherit' component="h2">
                {''}
              </Typography>
              <Typography component="p">
                {this.props.data.comment}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{marginTop:'0px',paddingTop:'0px'}}
            >
            {this.renderBottomLine.bind(this)()}
            {ups}
          </CardActions>
        </Card>
      );
    }
  }

    Feedback.propTypes = {
      classes: PropTypes.object.isRequired,
    };
/*
this.props.data={
  UserLeft:
  authorPhoto:
  comment:
  mark:
  dateTime:

  rentedFrom:
  rentedTo:
  rentedItem:

  userAbout:

}

*/
    export default withStyles(styles)(Feedback);
