
import React from 'react'
import {connect} from 'react-redux'

class SetupKeycloak extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.props.keycloak.init({onLoad:'check-sso'}).then(authenticated => {
             this.props.changeSecInitialized(true);
             this.props.changeSecAuthenticated(authenticated);
       });
    }

    componentWillUnmount() {
    }
    render() {
      return this.props.children;
    }
};

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

export default connect(mapStateToProps, mapDispachToProps) (SetupKeycloak);
