import update from 'immutability-helper'
import Keycloak from 'keycloak-js';
import keycloakConfig from 'config/keycloak.json'
//https://github.com/kolodny/immutability-helper

//later there might be several reducers that will be assembled in this file.
const initialState ={
    uselessDummy:{subuselessDummy:1},
    security:{
      keycloak:Keycloak(keycloakConfig),
      authenticated:false,
      initialized:false,
    }

  }

const rootReducer=(state=initialState, action)=>{
   switch(action.type){
    case 'SEC_CH_AUTHENTICATED':
       return update(state, {
          security:{
            authenticated:{$set:action.payload.authenticated}
          }
       });
    case 'SEC_CH_INITIALIZED':
          return update(state, {
           security:{
             initialized:{$set:action.payload.initialized}
           }
         });
    case '@@INIT':
           return state;
    default:
        console.log('invalid reducer call! action: '+action.type);
        return state;
   }

}
export default rootReducer;
