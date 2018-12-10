import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import SetupKeycloak from 'store/SetupKeycloak'
//in-project imports
import rootReducer from './store/reducers/rootReducer'

import MainRouter from './routers/MainRouter'
//this is for <<redux dev tools>> browser extention, recommended
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(reducer); //use this insteadfor production build
     class App extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return <SetupKeycloak><MainRouter/></SetupKeycloak>;
      }
    };

 render(<Provider store ={store} ><App/></Provider>, document.getElementById('root'));
