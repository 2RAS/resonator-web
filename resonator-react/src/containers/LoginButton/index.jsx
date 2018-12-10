
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import KeycloakAPI from 'api/KeycloakAPI'

import LoadingIcon from 'components/common/LoadingIcon'
import {Link} from 'react-router-dom'

class LoginButton extends React.Component {
  state = {
    email:undefined,
    login:undefined,
    password:undefined,
    loading:false,
    emailDialog:{
      open: false,
      inputError: false
    },
    passwordDialog:{
      open: false,
    }
  };
  emailRegex= /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
  handleClickOpen = () => {
    this.setState({emailDialog:{ open: true }});
  };

  emailDialog={
    handleInputChange: (e)=>{
      if(this.emailRegex.test(e.target.value))this.setState({email:e.target.value,login:undefined, emailDialog:{...this.state.emailDialog,inputError:false}});
      else this.setState({email:undefined,login:e.target.value}) //emailDialog:{...this.state.emailDialog,inputError:true}
    },
    handleLogin: (e) => {
      if(this.state.emailDialog.inputError)
        alert('enter a correct email!');
      else{
          this.setState({loading:true});
          setTimeout(()=>{
          //  if(Math.random()%2)
              this.setState({loading:false,emailDialog:{open: false },passwordDialog:{open:true}});
          //  else alert('email is not registered!');
          }, 1000);
        }
    },
    handleClose: () => {
      this.setState({email:undefined,login:undefined,emailDialog:{open: false }});
    },
    handleRegister: () => {
      this.setState({emailDialog:{open: false }});
    }
  }
  passwordDialog={
    handleForgotPassword: ()=>{
      alert('For now, there is nothing I can do..')
    },
    handleClose: () => {
      this.setState({passwordDialog:{open: false} });
    },
    handleLogin: () => {
      alert('great, at some point server will handle this')
      this.setState({passwordDialog:{open:false}});
      KeycloakAPI.getTokens(this.state.email,this.state.password);
    }
  }

  render() {
    return (
      <div>
        <button style = {this.props.button.style} className = {this.props.button.className} onClick={this.handleClickOpen}>Login/Register</button>
        <Dialog
          open={this.state.emailDialog.open}
          onClose={this.emailDialog.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login/Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              enter your e-mail:
            </DialogContentText>
            <Input
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              onChange={this.emailDialog.handleInputChange}
              fullWidth
              error ={this.state.emailDialog.inputError}
            />
          {this.state.loading?<div style={{height:'150px'}}>
            <LoadingIcon/>
          </div>:null}
          </DialogContent>
          <DialogActions>
            <Link to="/register" style={{color:'inherit',textDecoration:'inherit'}}>
              <Button onClick={this.emailDialog.handleRegister} color="primary">
                Register
              </Button>
            </Link>
            <Button onClick={this.emailDialog.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.emailDialog.handleLogin} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.passwordDialog.open}
          onClose={this.passwordDialog.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.email}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="email"
              fullWidth

            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.passwordDialog.handleForgotPassword} color="primary">
              Forgot?
            </Button>
            <Button onClick={this.passwordDialog.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.passwordDialog.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
}
export default LoginButton;
