import React from 'react';

import 'styles/positioning.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import request from 'superagent';
import Dropzone from 'react-dropzone'
import Image from './Image'
import AddImage from './AddImage'
import './styles.css'

/* used tutorial from https://css-tricks.com/image-upload-manipulation-react/*/
const CLOUDINARY_UPLOAD_PRESET = 'advertImages';
const CLOUDINARY_UPLOAD_URL='https://api.cloudinary.com/v1_1/yreppils/upload'

const styles = theme => ({
  root:{
    overflow:'hidden',
  },
  imageLoader:{
    overflowX:'auto',
    border:'2px dashed black',
    whiteSpace:'nowrap',
    height:'calc(100% - 4px)',
    width:'calc(100% - 4px)',
  },
  image:{
    height:'96%',
    display:'inline-block',
  },
  addimage:{
  },
  container:{
    position:'absolute',
    top:'2.5%',
    left:'0',
    textAlign:'center',
    maxWidth:'1000%',
    height:'95%',
    whiteSpace: 'nowrap',
    right:0,
  }
})

class ImageLoader extends React.Component{
  constructor(props){
    super();
    //this.props.onUploaded(link) must be defined
    //this.props.onRemoved(link) must be defined
    //this.props.imageLinks must be an array with links of already uploaded images.
  }
  handleDrop(accFiles, rejFiles, evt){
    evt.preventDefault();
    console.log('received images');
    for(let f of accFiles)this.handleImageUpload(f);
  }
  handleRemove(link){
    this.props.onRemoved(link);
  }
  handleImageUpload(file) {
   let upload = request.post(CLOUDINARY_UPLOAD_URL)
                       .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                       .field('file', file);

   upload.end((err, response) => {
     if (err) {
       console.error(err);
     }
     if (response.body.secure_url !== '') {
       this.props.onUploaded(response.body.secure_url);
     }
   });
 }

  render(){
    let contents = [];
    for(let i of this.props.imageLinks){
      contents.push(<Image key={i}
        className={this.props.classes.image +' '+this.props.imageClassName}
        imageClassName={this.props.classes.image +' '+this.props.imageClassName}
        imageLink={i}
        onRemoved={this.handleRemove.bind(this)}
        onChosen={this.props.onChosen}
        chosen={this.props.chosenLink===i?true:false}
        viewOnly={this.props.readOnly}/> )
    }
    if(!this.props.readOnly){
      if(contents.length === 0)
           contents.push(<p key='addFirst'>Click or drop files here!</p>)
      else contents.push(<AddImage className={this.props.classes.image} onDrop={this.handleDrop.bind(this)}></AddImage>);
    }

    return (
      <div className={[this.props.className,((this.props.imageLinks.length>0)?this.props.classNameOpened:this.props.classNameClosed)].join(' ')}>
        <Dropzone
          disableClick = {this.props.imageLinks.length>0}
          accept="image/*"
          onDrop={this.handleDrop.bind(this)}
          className={(!this.props.dropzoneClassName)?this.props.classes.imageLoader:
                      (this.props.classes.imageLoader+' '+this.props.dropzoneClassName)}
          >
          <div className={(!this.props.containerClassName)?this.props.classes.container:
                      (this.props.classes.container+' '+this.props.containerClassName)}>
            {contents}
          </div>
        </Dropzone>
      </div>

)

  }
}

ImageLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  imageLinks: PropTypes.array,
  readOnly:PropTypes.boolean
};

export default withStyles(styles)(ImageLoader);
