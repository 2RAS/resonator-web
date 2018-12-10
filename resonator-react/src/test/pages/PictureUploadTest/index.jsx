

//external dependenciess
import React from 'react'
//internal dependencies
import ImageLoader from 'components/ImageLoader'
// props and styles
import './styles.css'
import 'styles/positioning.css'
// test data

class PictureUploadTest extends React.Component{
   constructor(props){
     super(props);
     this.state={
       imageLinks:[],
       mainLink:undefined
     };
   }
   handleGiveThingsClick(){

   }
   handleAddImageLink(link){

     this.setState({
       imageLinks:this.state.imageLinks.concat([link]),
       mainLink:(this.state.mainLink===undefined?link:this.state.mainLink),
     });
   }
   handleChooseMainImageLink(link){
     this.setState({
       mainLink:link
     });
   }
   handleRemoveImageLink(link){
     var index = this.state.imageLinks.indexOf(link);
     if (index !== -1){
       this.state.imageLinks.splice(index, 1);
       if(link===this.state.mainLink){
         this.state.mainLink=this.state.imageLinks.length>0?this.state.imageLinks[0]:undefined;
       }
     }
     this.forceUpdate();
   }
   render(){
    return (
      <div className='pictureUploadTest-root'>
      <div  className='pictureUploadTest-imageLoaderContainer'>
        <ImageLoader classNameClosed='pictureUploadTest-imageLoaderСlosed'
                   classNameOpened='pictureUploadTest-imageLoaderOpened'
                   className='pictureUploadTest-imageLoader'
                   imageLinks={this.state.imageLinks}
                   chosenLink={this.state.mainLink}
                    onUploaded={this.handleAddImageLink.bind(this)}
                    onRemoved={this.handleRemoveImageLink.bind(this)}
                    onChosen={this.handleChooseMainImageLink.bind(this)}>
                  </ImageLoader>
      </div>
      <h1 className='pictureUploadTest-linksName'>Passed Links</h1>
      <div className='pictureUploadTest-links'>
        {this.state.imageLinks.map(x=>{return <a style={{display:'block',backgroundColor:x===this.state.mainLink?'lightgreen':'lightgrey',padding:'10px', margin:'5px'}} href={x}>{x}</a>})}
      </div>
      </div>
    );
  }
};
export default PictureUploadTest;
