

//external dependenciess
import React from 'react'
import qs from 'qs'
//internal dependencies
import './styles.css'
import 'styles/positioning.css'
// test data
import AdvertList from 'containers/AdvertList'
import DetailedAdvertSearch from 'containers/search/DetailedAdvertSearch'
import AdvertAPI from 'api/AdvertAPI'
import SearchAPI from 'api/SearchAPI'
import SearchUtils from 'classes/data/SearchUtils'
import Background from 'media/background.png'
import Media from 'react-media'
class SearchPage extends React.Component{
   constructor(props){
     super(props);
     let link = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
     this.state={
       searchParams:SearchUtils.toSearchParams(link),
       advertIDs:[],
       adverts:[],
     };
     this.handleSearch(this.state.searchParams);
   }
   getAdvertsByIDs(ids){
     for(let id of ids){
       AdvertAPI.getAdvertById(id).then(result =>{
         this.state.adverts.push(result);
         this.forceUpdate();
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
     SearchAPI.searchAdverts(this.state.searchParams).then((ids)=>{
       this.setState({
         advertIDs:ids,
         adverts:[]
       });
    this.getAdvertsByIDs(ids);
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
      <DetailedAdvertSearch onSearch={this.handleSearch.bind(this)}
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
export default SearchPage;
