import React from 'react';

import 'styles/positioning.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import tranSquare from './tranSquareAdd.png'
import Dropzone from 'react-dropzone'
const styles = theme => ({
  container:{
    position:'relative',
    background:'black',
    height:'100%',
    borderRadius:'10%',
    display:'inline-block',
    padding:'0',
    whiteSpace: 'nowrap',
    textAlign: 'center',
},
image:{
  display:'block',
  height:'80%',
  maxWidth:'80%',
  padding:'10%',
},
text:{
    position:'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
}
});
class AddImage extends React.Component{
  constructor(props){
    super();
    //this.props.imageLink
    //this.props.error;
  }

  handleDrop(accFiles,rejFiles,evt){
    evt.stopPropagation();
    this.props.onDrop(accFiles,rejFiles,evt);
  }
  render(){

    return(
      <Dropzone
        accept="image/*"
        onDrop={this.handleDrop.bind(this)}
        className={[this.props.classes.container,this.props.className].join(' ')}
        ><img className={this.props.classes.image} alt='tr' src={tranSquare}/></Dropzone>
    )
  }
}

AddImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddImage);
