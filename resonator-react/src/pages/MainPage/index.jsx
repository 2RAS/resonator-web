
//external dependenciess
import React from 'react'
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
//internal dependencies
import BlockLink from 'components/BlockLink';
import ResonatorLogo from 'components/ResonatorLogo';
import ExternalLoginButton from 'containers/ExternalLoginButton';
import AdvertSearch from 'containers/AdvertSearch';
import AdvertAPI from 'api/AdvertAPI'
// props and styles
import './styles.css'
import 'styles/positioning.css'
// test data
import CREATE_IMG from 'media/create.jpeg'
import EXPLORE_IMG from 'media/explore.jpeg'
import ResonatorLogoImage from 'media/ResonatorLogoImage.png'

class MainPage extends React.Component{
   constructor(props){
     super(props);
     this.state={};
   }
   handleGiveThingsClick(){
     this.props.history.push({
       pathname: '/createComposition'
     });
   }
   handleTakeThingsClick(){
     this.props.history.push({
       pathname: '/search'
     });
   }
   handleLoginPopup(){
     alert('aa');
   }
   render(){
  /*   <Button onClick={this.TEST_handleGetAdverts.bind(this)}>AdvertButton</Button>
     <Button onClick={this.TEST_handleCreateAdvertPage.bind(this)}>Create advert page!</Button>*/
    return (
    <div className='fullScreen'>
      <ResonatorLogo image={ResonatorLogoImage} className='mainPage-mainLogo'/>
      <ExternalLoginButton button={{style:{}, className:'mainPage-loginButton'}} style={{zIndex:100}} tokenStyle={{zIndex:100}}/>
      <AdvertSearch className='mainPage-advertSearch' history={this.props.history} > </AdvertSearch>
      <div className='mainPage-imageLinkContainer'>
        <BlockLink name='Create Adaptive Music!' className='mainPage-imageLink' onClick={this.handleGiveThingsClick.bind(this)} backgroundImage={CREATE_IMG}/>
        <div style={{background:'black',padding:'0', margin:'0'}}>a</div>
        <BlockLink name='Explore Music Archive!' className='mainPage-imageLink' onClick={this.handleTakeThingsClick.bind(this)} backgroundImage={EXPLORE_IMG}/>
      </div>
        {/*temporary elements (design/etc)*/}
      {/*<div style = {{position:'absolute', top:'60%', left:0, width:'100%', background:'black', height:'40%', zIndex:-1}}/>
      <div style = {{position:'absolute', bottom:0, left:0, width:'100%', textAlign:'center', height:'8%', color:'white', fontSize:'100%'}}>
      This is a test design with horrible CSS. Do not judge. 13
    </div>*/}
    </div>);
  }
};

const mapStateToProps = (state)=>{
  return {
    keycloak:state.security.keycloak,
    kcAuthenticated:state.security.authenticated,
    kcInitialized:state.security.initialized
  }
}
export default connect(mapStateToProps)(MainPage);
