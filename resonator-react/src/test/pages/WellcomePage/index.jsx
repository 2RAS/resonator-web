import React from 'react'
import MenuAppBar from 'components/common/MenuAppBar'
import AdvertCard from 'components/AdvertCard'
import 'styles/positioning.css'
import './styles.css'
import {adverts} from 'test/data.jsx'

class WellcomePage extends React.Component{


   render(){
    return (
    <div>
      <div style={{position:'fixed', background:'white' , width:'100%',top:0,left:0, zIndex:'10'}}>
        <MenuAppBar style={{marginLeft:'10px',marginRight:'10px'}}></MenuAppBar>
      </div>
        <MenuAppBar style={{visibility:'hidden'}}/>
        <div style={{float:'right',margin:'20px',width:'20%'}}>
          {adverts.map((e)=>{
            return (
              <AdvertCard key ={e.name} data = {e}>
              </AdvertCard>
            );
          })}
        </div>
        <div  style={{float:'left', width:'100%',zIndex:-10}}>
          <div  className='centered' style={{zIndex:-10}}>
            <h1 className='background_text'>Wellcome to Resonator!<br/> Site is undergoing <strike>re</strike>construction </h1>
          </div>
        </div>
    </div>);
  }

};
export default WellcomePage;
