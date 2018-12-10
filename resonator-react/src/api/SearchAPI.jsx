import Config from 'config/api.json'
import request from 'superagent'
import SearchUtils from 'classes/data/SearchUtils'

class SearchAPI {
    static searchAdverts(params) {

      let newParams={};
      let req = request
                  .get('http://' + Config.searchapi.uri + '/' + Config.searchapi.endPoints.findAdverts)
                  .set('Authorization','Basic '+'YXBpOlZhYw==');//btoa(Config.searchapi.auth.username+":"+Config.searchapi.auth.password));

      //searchValue(String, optional), category(String, optional), info(boolean, option$
      let num_of_hours =SearchUtils.getHoursDuration(params);
      let minPricePerDay =SearchUtils.priceToACP_Day(params.minPrice);
      let maxPricePerDay =SearchUtils.priceToACP_Day(params.maxPrice);
      if(params.query){
        req.query({searchValue:params.query});
        console.log('added query to search: '+params.query);
      }
      if(params.location){
        req.query({location:params.location});
        console.log('added location to search: '+params.location);
      }
      if(params.category.length){
        req.query({category:SearchUtils.categoryToString(params.category)});
        console.log('added category to search: '+SearchUtils.categoryToString(params.category));
      }
      //if(params.info)req.set('info', params.query);
      req.query({info:params.fullText});
      if(minPricePerDay)req.query({minPrice: minPricePerDay});
      if(maxPricePerDay)req.query({maxPrice:maxPricePerDay});
      if(num_of_hours)req.query({num_of_hours:num_of_hours});
      req = req.on('error', err => {
                console.log('error obtaining search results');
            })
            .then((res) => {
              console.log('got Search results: ' + JSON.stringify(res.body));
              return res.body;
            })
      return req;
    };
    static searchUsers(query) {
      let req = request
                  .get('http://' + Config.searchapi.uri + '/' + Config.searchapi.endPoints.findUsers)
                  .set('Authorization','Basic '+'YXBpOlZhYw==');//btoa(Config.searchapi.auth.username+":"+Config.searchapi.auth.password));

      //searchValue(String, optional), category(String, optional), info(boolean, option$
        req.query({searchValue:query});

      req = req.on('error', err => {
                console.log('error obtaining user search results');
            })
            .then((res) => {
              console.log('got user Search results: ' + JSON.stringify(res.body));
              return res.body;
            })
      return req;
    };
}


export default SearchAPI;
