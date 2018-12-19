import React from 'react'
// import Input from '@material-ui/core/Input'; // may be used

import './styles.css'
import 'styles/positioning.css'
import qs from 'qs'
class AdvertSearch extends React.Component{
   constructor(props){
     super(props);
     this.state={
       inputPlaceholder:'A   Search for music!'
     };
     this.inputRef = React.createRef();
   }
   handleResize(){

     if(window.innerWidth < 400){
       this.setState({inputPlaceholder:'Search!'});
     } else {
        this.setState({inputPlaceholder:'        Search for music!'});
     }
   }
   componentWillMount(){
    this.handleResize(()=>window.innerHeight,()=>window.innerWidth);
  }
  componentDidMount(){
      window.addEventListener("resize", this.handleResize.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
  }
  handleSearch(){
   let params=qs.stringify({query:this.inputRef.current.value})

    this.props.history.push({
      pathname: '/search',
      search: params,
      state: { detail:'somedetail' }
    });
  }
   render(){
    return (

    <div style={this.props.style} className ={this.props.className+' advertSearch'}>
      <input ref={this.inputRef} className='advertSearch-input' type='search' placeholder={this.state.inputPlaceholder}/>
      <input type='button' className='advertSearch-button' value='search!' onClick={this.handleSearch.bind(this)}/>
    </div>);
  }

};
export default AdvertSearch;
