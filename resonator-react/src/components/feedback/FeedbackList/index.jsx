import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatingComponent from 'components/StarRatingComponent'
import Media from 'react-media'
import Feedback from 'components/feedback/Feedback'
const styles = {
    list:{
      padding:'1px',
      maxHeight:'60%',
      overflowY:'auto'
    }
  };

  class FeedbackList extends React.Component{
      constructor(props){
        super(props);
      }
    render(){
      let advertList =(this.props.feedbacks)?this.props.feedbacks.map(
                          (feedback)=>{
                              return <Feedback key={feedback.author} data={feedback}/>
                            }):'';
      advertList.reverse();
      return(
        <div className={this.props.classes.list+' '+this.props.className}>
          {advertList}
        </div>
      );
    }
  }

    FeedbackList.propTypes = {
      classes: PropTypes.object.isRequired,
    };
/*
this.props.data={
  author:
  comment:
  mark:
  dateTime:
  rentedFrom:
  rentedTo:
  rentedItem:

}

*/
    export default withStyles(styles)(FeedbackList);
