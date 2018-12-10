
import React from 'react';

import './styles.css'
class ResonatorLogo extends React.Component{
  render(){
    return(
      <div className={'ResonatorLogo-main '+this.props.className}>
        <img src = {this.props.image} className='ResonatorLogo-image' alt='Resonator'/>
      </div>
    )
  }
}

export default ResonatorLogo;
