
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css'
import qs from 'qs'

const styles = {
  card: {
    maxWidth:'345px',
  },
  media: {
      height: '100%',
    },
  mediaExists: {
        minHeight:'100px',
      },
  };
  class AdvertCard extends React.Component{
    handleAdvertDetailsClicked(evt){
      let params=qs.stringify({id:this.props.data.id})
       this.props.history.push({
         pathname: '/advert',
         search: params,
         state: {}
       });
    }
    render(){
      var {classes} = this.props;
      var photo =undefined;
      if(this.props.data.photo) photo= this.props.data.photo;
      else if(this.props.data.mainLink)photo = this.props.data.mainLink;
      if(this.props.data.photo==null)this.props.data.photo=undefined
      return (
        <Card className={classes.card} style={{...{margin:'15px'}, ...this.props.style}}>
          <CardActionArea style={{width:'100%'}} onClick = {this.handleAdvertDetailsClicked.bind(this)} >
            <CardMedia
              className={classes.media+' '+(photo?classes.mediaExists:'')}
              image={photo}
              title={this.props.data.info}
              />
            <CardContent>
              <Typography gutterBottom variant='inherit' component="h2">
                {this.props.data.name}
              </Typography>
              <Typography component="p">
                {this.props.data.info}
              </Typography>
              <Typography style={{color:'grey'}} component="p">
                {'published '+new Date(this.props.data.date).toLocaleString()}
              </Typography>
              <Typography style={{color:'blue'}} component="p">
                {this.props.data.numb_of_hours?('min. renting period: '+Math.floor(this.props.data.numb_of_hours/24)+' days '+this.props.data.numb_of_hours%24+' hours.'):''}
              </Typography>

              <Typography style={{color:'red',float:'right'}} component="p">
                {(this.props.data.location?this.props.data.location:'location unknown')}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              I am interested!
            </Button>
            <Button size="small" color="primary" onClick = {this.handleAdvertDetailsClicked.bind(this)}>
              Details
            </Button>
            <Button size="small" variant="outlined" className={classes.button}>
              {this.props.data.price?(this.props.data.price+' '+(this.props.data.currency?this.props.data.currency:'acp')+'/'+(this.props.data.timePeriod?this.props.data.timePeriod:'day')):''}
            </Button>
          </CardActions>
        </Card>
      );
    }
  }

    AdvertCard.propTypes = {
      classes: PropTypes.object.isRequired,
    };

    export default withStyles(styles)(AdvertCard);
