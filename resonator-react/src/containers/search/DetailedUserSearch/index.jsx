import React from 'react'
// import Input from '@material-ui/core/Input'; // may be used

import './styles.css'
import 'styles/positioning.css'
import SearchBar from 'containers/search/SearchBar'
import Button from '@material-ui/core/Button';
import qs from 'qs'
import Media from 'react-media'
class AdvertSearch extends React.Component{
   constructor(props){
     super(props);
     this.state={

     };
     //this.props.SearchParams/
     this.refs={
       searchBarRef:React.createRef(),
     }
   }
  onQueryUpdate(newQuery){
    this.props.onChange({
      ...this.props.searchParams,
      query:newQuery,
    })
   //todo
  }
  onSearchClicked(evt){
    let params=qs.stringify(this.props.searchParams);
    this.props.history.push({
      pathname: '/usersearch',
      search: params,
      state: { detail:'somedetail' }
    });
    this.props.onSearch(this.props.searchParams);
  }
   render(){
    return (
    <div style={this.props.style} className ={this.props.className+' detailedUserSearch'}>
      <h1 style={{display:'block',textAlign:'center'}}>User search</h1>
      <div id='detailedUserSearch-2partsContainer1'>
        <div className ='detailedUserSearch-part' id ='detailedUserSearch-main'>
          <SearchBar placeholder='Search for users!'
                     className='detailedUserSearch-SearchBar'
                     inputClassName='detailedUserSearch-SearchBarInput'
                     value={this.props.searchParams.query}
                     onChange={this.onQueryUpdate.bind(this)}
                     usersearch={true}
                     history={this.props.history}/>

        </div>
      </div>
      <div className ='detailedSearch-part' >
        <button className='detailedSearch-SearchButton' onClick={this.onSearchClicked.bind(this)}>Search!</button>
      </div>
    </div>);
  }

};
export default AdvertSearch;
