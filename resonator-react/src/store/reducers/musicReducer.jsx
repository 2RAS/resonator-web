import update from 'immutability-helper'
//https://github.com/kolodny/immutability-helper
const initialState ={
  states:{DefaultState:{'guitar':{volume:0.5},'drums':{volume:0.5},'bass':{volume:0.5},'rhytm_guitar':{volume:0.5}},
          DangerState:{'guitar':{volume:0.1},'drums':{volume:0.7},'bass':{volume:0.9},'rhytm_guitar':{volume:0.1}},
          AttentionState:{'guitar':{volume:0.2},'drums':{volume:0.05},'bass':{volume:0.5},'rhytm_guitar':{volume:0.1}},
          NoisyState:{'guitar':{volume:0.8},'drums':{volume:0.2},'bass':{volume:0.5},'rhytm_guitar':{volume:0.5}}},
  objectStateMap:{Listener:'DefaultState',
                  Dog:'DangerState',
                  Metro:'NoisyState',
                  TrafficLight:'AttentionState'},
  objectPosition:{Listener:{x:'100',y:'100'}, Dog:{x:'100', y:'100'},Metro:{x:'100', y:'100'},TrafficLight:{x:'100', y:'100'},},
  currentConfig:{'guitar':{volume:0.5},'drums':{volume:0.5},'bass':{volume:0.5},'rhytm_guitar':{volume:0.5}}
}

const reducer=(state=initialState, action)=>{

   if(action.type === 'CH_CURR_CONF'){
     return update(state, {
      currentConfig:{$set:action.payload}
    });
   }
   if(action.type === 'ADD_MUSIC_FILE'){
     //return newState.volumes.push(action.payload);
     return update(state, {
       objectPosition: {
         [action.payload.objectName]: {
           x: {$set:action.payload.x},
           y: {$set:action.payload.y}
         }
       }
     });
   }
   if(action.type === 'STATE_CH_VOL'){
      return update(state, {
       states: {
         [action.payload.stateName]: {
            [action.payload.trackName]: {
              volume:{$set:action.payload.value}
            }
         }
       }
     });
   }
   if(action.type ==='CH_OBJ_POS'){
     return update(state, {
       objectPosition: {
         [action.payload.objectName]: {
           x: {$set:action.payload.x},
           y: {$set:action.payload.y}
         }
       }
     });
   }
 return state;
}
export default reducer;
