import React from 'react'
// import Input from '@material-ui/core/Input'; // may be used

import './styles.css'
import 'styles/positioning.css'
import qs from 'qs'
class SearchBar extends React.Component{
   constructor(props){
     super(props);
     this.state={
       inputPlaceholder:'Enter your query!'
     };
   }
   handleResize(){
     if(window.innerWidth < 400){
       this.setState({inputPlaceholder:'Search!'});
     } else {
        this.setState({inputPlaceholder:'Enter your query!'});
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
      state: { detail:'somedetail'}
    });
  }
  handleSearchChange(evt){
    this.props.onChange(evt.target.value);
  }
   render(){
    return (
    <div style={this.props.style} className ={this.props.className+' searchBar'}>
      <input style={{display:'block'}} className={(this.props.buttonClassName?this.props.inputClassName:'')+ ' searchBar-button'} type='button' value='x'/>
      <input className={(this.props.inputClassName?this.props.inputClassName:'')+ ' searchBar-input'} type='search' placeholder={this.state.inputPlaceholder} value={this.props.value} onChange={this.handleSearchChange.bind(this)}/>
    </div>);
  }

};
export default SearchBar;
