
import React from 'react';
import './styles.css'
import 'styles/positioning.css'
class BlockLink extends React.Component{
  render(){
    return(
      <a className={'blockLink '+this.props.className} onClick={this.props.onClick} style={{...this.props.style, backgroundImage:`url(${this.props.backgroundImage})`, backgroundSize:'cover'}} href={this.props.link}>
          <div className='blockLink-text blockLink-text_black unselectable'>
              {this.props.name}
            </div>
      </a>
    )
  }
}

export default BlockLink;
