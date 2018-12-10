import request from 'superagent'
import Config from 'config/api.json'

class UserAPI{
  // here all the functions for data retrieval should be.
  static getKeycloakUserInfo(id) {
    return  request
          .get('http://' + Config.keycloakmicroserviceapi.uri + '/' + Config.keycloakmicroserviceapi.endPoints.get + '/' + id)
          .on('error', err => {
              console.log('getUserKeycloakInfo encountered error');
          })
          .then((res) => {
            console.log('got JSON keycloak user info: ' + JSON.stringify(res.body));
            return res.body;
          })
  };
  static getAdditionalUserInfo(id) {
    return  request
          .get('http://' + Config.userapi.uri + '/' + Config.userapi.endPoints.get + '/' + id)
          .on('error', err => {
              console.log('getUserAdditionalInfo encountered error');
          })
          .then((res) => {
            console.log('got JSON additional user info: ' + JSON.stringify(res.body));
            return res.body;
          })
  };
}

export default UserAPI;
