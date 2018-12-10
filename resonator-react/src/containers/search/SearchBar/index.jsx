import React from 'react'
// import Input from '@material-ui/core/Input'; // may be used

import './styles.css'
import 'styles/positioning.css'
import qs from 'qs'
import USERMUSIC from 'media/usermusic.png'
class SearchBar extends React.Component{
   constructor(props){
     super(props);
     this.state={
       inputPlaceholder:this.props.placeholder?this.props.placeholder:'Enter your query!'
     };
   }
   handleResize(){
     if(window.innerWidth < 400){
       this.setState({inputPlaceholder:'Search!'});
     } else {
        this.setState({inputPlaceholder:this.props.placeholder?this.props.placeholder:'Enter your query!'});
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
   let pathname = '/search';
   if(this.props.usersearch)pathname ='/usersearch';
    this.props.history.push({
      pathname: pathname,
      search: params,
      state: { detail:'somedetail'}
    });
  }
  handleSearchChange(evt){
    this.props.onChange(evt.target.value);
  }
  handleChangeButtonClicked(evt){
    if(this.props.usersearch){
      this.props.history.push({
        pathname: '/search',
        search: qs.stringify({query:this.props.value}),
        state: { detail:'somedetail'}
      });
    }
    else {
      this.props.history.push({
        pathname: '/usersearch',
        search: qs.stringify({query:this.props.value}),
        state: { detail:'somedetail'}
      });
    }
  }
   render(){
    return (
    <div style={this.props.style} className ={this.props.className+' searchBar'}>
      <button style={{display:'block'}}
              className={(this.props.buttonClassName?this.props.inputClassName:'')+ ' searchBar-button'}
              onClick={this.handleChangeButtonClicked.bind(this)}>
        <img style={{maxHeight:'100%',maxWidth:'100%'}} src={USERMUSIC}></img>
      </button>
      <input className={(this.props.inputClassName?this.props.inputClassName:'')+ ' searchBar-input'} type='search' placeholder={this.state.inputPlaceholder} value={this.props.value} onChange={this.handleSearchChange.bind(this)}/>
    </div>);
  }

};
export default SearchBar;
