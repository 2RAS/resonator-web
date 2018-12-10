

import React from 'react'
import WellcomePage from 'test/pages/WellcomePage'
import TestList from 'test/pages/TestList'
import PictureUploadTest from 'test/pages/PictureUploadTest'
import FeedbackTest from 'test/pages/FeedbackTest'
import {Route, Switch, BrowserRouter } from 'react-router-dom' //use Link to create links


class MainRouter extends React.Component{

   render(){
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/tests/wellcome" component={WellcomePage}/>
            <Route path="/tests/pictureUploadTest" component={PictureUploadTest}/>
            <Route path="/tests/feedbackTest" component={FeedbackTest} />

            {/* <Route exact path="/yourPage" component={YourComponent}/> */}
            <Route path="/tests/" componenet={TestList} />
            hello!
          </Switch>
      </BrowserRouter>
    )
  }

};
export default MainRouter;
