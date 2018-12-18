

//external dependenciess
import React from 'react'
import qs from 'qs'
//internal dependencies
import './styles.css'
import 'styles/positioning.css'
// test data
import Background from 'media/background.jpg'
import FullAdvert from 'containers/FullAdvert'

class ViewAdvert extends React.Component{
   constructor(props){
     super(props);
     let link = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
     this.state={
       advertId:link.id,
     };
   }


   render(){
    return (
    <div className='overflowXHidden viewAdvert' style={{background:`url(${Background})`}}>
      <FullAdvert className= 'viewAdvert-fullAdvert' id={this.state.advertId} history={this.props.history}/>
    </div>);
  }
};
export default ViewAdvert;
