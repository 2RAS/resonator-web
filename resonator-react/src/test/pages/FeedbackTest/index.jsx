

//external dependenciess
import React from 'react'
/*import qs from 'qs'*/
//internal dependencies
import 'styles/positioning.css'
import './styles.css'
// test data
import Background from 'media/background.png'
import AdvertFeedback from 'components/feedback/AdvertFeedback'
class FeedbackTest extends React.Component{
   constructor(props){
     super(props);
     //let link = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
     this.state={
     };

   }
   render(){
    return (
    <div className='overflowXHidden fullScreen' style={{background:`url(${Background})`}}>
      <AdvertFeedback className='feedbackTest-list' AdvertId='11001010011'/>
    </div>);
  }
};
export default FeedbackTest;
