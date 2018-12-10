

//external dependenciess
import React from 'react'
import qs from 'qs'
//internal dependencies
import './styles.css'
import 'styles/positioning.css'
// test data
import AdvertList from 'containers/AdvertList'
import DetailedUserSearch from 'containers/search/DetailedUserSearch'
import UserAPI from 'api/UserAPI'
import SearchAPI from 'api/SearchAPI'
import SearchUtils from 'classes/data/SearchUtils'
import AdvertUtils from 'classes/data/AdvertUtils'
import Background from 'media/background.png'
import Media from 'react-media'
class UserSearchPage extends React.Component{
   constructor(props){
     super(props);
     let link = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
     this.state={
       searchParams:SearchUtils.toUserSearchParams(link),
       advertIDs:[],
       adverts:[],
     };
     this.handleSearch(this.state.searchParams);
   }
   getClientsByIDs(ids){
     for(let id of ids){
       UserAPI.getKeycloakUserInfo(id).then(result =>{
         UserAPI.getAdditionalUserInfo(id).then(adResult =>{
           this.state.adverts.push(AdvertUtils.horribleUserToAdvertConvert(result,adResult));
           this.forceUpdate();
         });
       })
     }
     /*
     AdvertAPI.getAdvertsByIdList(ids).then(result =>{
                this.setState({
                  adverts:result,
                });
            });*/
   }
   handleSearch(searchParams){
     //getLinks (search API);
     SearchAPI.searchUsers(this.state.searchParams.query).then((ids)=>{
       this.setState({
         advertIDs:ids,
         adverts:[]
       });
    this.getClientsByIDs(ids);
    });
   }
   handleSearchParamsChange(searchParams){
     this.setState({
       searchParams:searchParams,
     });
   }
   render(){
    return (
    <div className='overflowXHidden searchPage' style={{background:`url(${Background})`}}>
      <DetailedUserSearch onSearch={this.handleSearch.bind(this)}
                      onChange={this.handleSearchParamsChange.bind(this)}
                      searchParams={this.state.searchParams}
                      className='searchPage-detailedSearch'
                      adverts={undefined}
                      history={this.props.history}
              />
            <Media query="(min-width: 780px)">
                {matches =>
                  matches ? (
                    <Media query="(min-width: 1300px)">
                      {matches =>
                        matches ? (
                          <AdvertList className='searchPage-advertList'
                            style={{width:'1250px'}}
                            adverts ={this.state.adverts}
                            history={this.props.history}
                            rowCount={3} />
                        ) : (
                          <AdvertList className='searchPage-advertList'
                            style={{width:'760px'}}
                            adverts ={this.state.adverts}
                            history={this.props.history}
                            rowCount={2} />
                        )
                      }
                    </Media>
                  ) : (
                    <AdvertList className='searchPage-advertList'
                      style={{width:'400px'}}
                      adverts ={this.state.adverts}
                      history={this.props.history}
                      rowCount={1} />
                  )
                }
              </Media>
    </div>);
  }
};
export default UserSearchPage;
