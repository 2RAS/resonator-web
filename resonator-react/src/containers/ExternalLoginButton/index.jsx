
import React from 'react';
import Keycloak from 'keycloak-js';
import keycloakConfig from 'config/keycloak.json'
import KeycloakUtils from 'classes/data/KeycloakUtils'
import {connect} from 'react-redux'
class ExternalLoginButton extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name:undefined
    };
  }

 handleLogin =()=>{
   if(this.props.kcInitialized){
      this.props.keycloak.login();
    }
 }
 handleLogout=()=>{
   if(this.props.kcAuthenticated)this.props.keycloak.logout();
 }
 handleCheckLogin=()=>{
   if(this.props.kcInitialized)this.props.keycloak.login({prompt:'none'});
 }
 getToken=()=>{
   //let Copied = this.props.keycloak.token.createTextRange();
   //Copied.execCommand("Copy");
 }

  render() {
    if (this.props.keycloak) {
        if (this.props.kcAuthenticated){
          let name = KeycloakUtils.getUserInfo(this.props.keycloak).name;
          return (
            <div>
              <button style = {this.props.button.style}
                      className = {this.props.button.className}
                      onClick={this.handleLogout.bind(this)}>
                        Logout ({name})
                      </button>
            </div>
            );
          }
        else{
          if(this.state.name){
            this.setState({name:undefined});
          }
          return (
            <div>
              <button style = {this.props.button.style} className = {this.props.button.className} onClick={this.handleLogin.bind(this)}>Login/Register</button>
            </div>
          );
          }
    }else {
            return (
                  <div>
                    <button style = {this.props.button.style} className = {this.props.button.className} onClick={this.handleLogin.bind(this)}>Checking user...</button>
                  </div>
                );
    }
  };
}

const mapStateToProps = (state)=>{
  return {
    keycloak:state.security.keycloak,
    kcAuthenticated:state.security.authenticated,
    kcInitialized:state.security.initialized
  }
}
const mapDispachToProps = (dispach)=>{
  return {
    changeSecAuthenticated:(value)=>dispach(
      {
        type:'SEC_CH_AUTHENTICATED',
        payload:
          {authenticated:value,
          }
      }),
      changeSecInitialized:(value)=>dispach(
        {
          type:'SEC_CH_INITIALIZED',
          payload:
            {initialized:value,
            }
        })
  };
}

export default  connect(mapStateToProps, mapDispachToProps) (ExternalLoginButton);
