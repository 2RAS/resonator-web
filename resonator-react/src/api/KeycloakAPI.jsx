
import keycloakConfig from 'config/keycloak.json'
import request from 'superagent'
class KeycloakAPI{
  // your/keycloak/url/auth/realms/master/protocol/openid-connect/token
  static getTokensByPassword(username, password){
    request
      .post(keycloakConfig.authServerUrl+'/realms/'+keycloakConfig.realm+'/protocol/openid-connect/token')
      .send({
        client_id : keycloakConfig.clientId,
        username : username,
        password : password,
        grant_type : "password"
      })
      .set('Content-Type', 'application/json')
      .then(res => {
        alert('yay got ' + JSON.stringify(res.body));
      });
    }
  static getToken(){
  }
}

export default KeycloakAPI;
