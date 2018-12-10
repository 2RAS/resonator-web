import React from 'react';

import 'styles/positioning.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Checkered from './checkered.jpeg'
import Star from './star.png'
const styles = theme => ({
  root:{
    overflow:'hidden',
    margin:'0',
    padding:'0',
  },
  image:{
    height:'100%',
    padding:0,
    margin:0,
    width:'100%'
  },
  imageContainer:{
    position:'relative',
    border:'4px dashed green',
    borderRadius:'10px',
    display:'block',
    marginLeft:'10px',
    marginRight:'10px',
    height:'calc(100% - 8px)',
    backgroundImage:'url('+Checkered+')',
    backgroundSize:'cover',
    overflow:'hidden',
  },
  delete:{
    border:'0px',
    position:'absolute',
    top:0,
    left:0,
    borderBottomRightRadius:'10px',
    boxShadow:'2px 2px 2px 2px rgba(0,0,0,0.5)',
    textAlign:'center',
    verticalAlign:'middle',
    background: 'red',
    padding:'10px',
  },
  makePrimary:{
    border:'0px',
    position:'absolute',

    borderRadius:'50%',
    textAlign:'center',
    verticalAlign:'middle',
    padding:'10px',
  },
  makePrimaryChosen:{
    top:'calc(50% - 35px)',
    left:'calc(50% - 35px)',
    height:'70px',
    width:'70px',
    backgroundColor:'rgba(100,255,100,0.8)',
    backgroundImage: 'url('+Star+')',
    backgroundSize: 'contain'
  },
  makePrimaryNotChosen:{
    top:'calc(50% - 25px)',
    left:'calc(50% - 25px)',
    height:'50px',
    width:'50px',
    backgroundColor: 'rgba(100,255,100,0.2)'
  },
  fullscreen:{
    textAlign:'center',
    zIndex:'100',
    position:'fixed',
    top:'0',
    left:'0',
    bottom:'0',
    right:'0',
    background:'rgba(0,0,0,0.6)',
    verticalAlign:'middle',
  },
  fullscreenImage:{
    position:'fixed',
    maxWidth:'90vw',
    maxHeight:'90vh',

    borderRadius:'10px',
    margin:'0 auto',

    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
  }
});
class Image extends React.Component{
  constructor(props){
    super(props);
    //this.props.imageLink
    //this.props.error;
    this.state={
      fsEnabled:false
    }
    this.fsImage=<div className={this.props.classes.fullscreen} onClick={(()=>this.setState({fsEnabled:false})).bind(this)}>
                    <img alt={this.props.imageLink} src={this.props.imageLink} className={this.props.classes.fullscreenImage} />
                </div>
  }


  render(){
    var contents;
    if (this.props.error){
     contents = <p> {this.props.error}</p>;
    }else if (this.props.imageLink){
     contents = <div className={this.props.classes.imageContainer +' '+(this.props.imageClassName?this.props.imageClassName:'')}
       style={{display:'inline-block'}}>
     <img alt={this.props.imageLink} src={this.props.imageLink} className={this.props.classes.image} onClick={()=>this.setState({fsEnabled:true})}/>
     {this.props.viewOnly?'':<input key= 'del' type='button' className={this.props.classes.delete} value='Delete!' onClick={()=>this.props.onRemoved(this.props.imageLink)}/>}
     {this.props.viewOnly?'':<input key= 'sel' type='button' className={[this.props.classes.makePrimary,(this.props.chosen?this.props.classes.makePrimaryChosen:this.props.classes.makePrimaryNotChosen)].join(' ')} value='' onClick={()=>this.props.onChosen(this.props.imageLink)}/>}
     </div>
    }else{
       contents = <p>Loading...</p>;
    }

    return(
      <div className={[this.props.className,this.props.classes.root].join(' ')} >
          {contents}
          {this.state.fsEnabled?this.fsImage:''}
      </div>

    )
  }
}

Image.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Image);
