import React from 'react'
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Config from 'config/registration.json'
import RegisterPart from './RegisterPart.jsx'

import 'styles/positioning.css'

class MainFields extends RegisterPart {
    constructor(props) {
        super();
        this.state = {
          ...this.state,
            fields:{
              login: props.fields.login?props.fields.login:'',
              email: props.fields.email?props.fields.email:'',
              password: props.fields.password?props.fields.password:'',
              confirm: props.fields.confirm?props.fields.confirm:''
            },
            showPassword: false,
            showconfirm: false,
            errors: {
              email:null,
              login:null,
              password:null,
              confirm:null,
            },
            warnings: {
              email:null,
              login:null,
              password:null,
              confirm:null,
            },
            isChipMinimized:{
              email:true,
              login:true,
              password:true,
              confirm:true,
            },
        }
    }


    handleLoginChange(event) {
      let warning = null,error = null;
      if(event.target.value.length > Config.registerPageRestrictions.loginMaxLength)
        error ='Can you think of something shorter?';
      else if(!(/^[a-z_A-Z]*$/.test(event.target.value)))
        error ='Only letters and underscores allowed!';
      this.handleFieldChange('login',error,warning,event.target.value);
    }
    handleEmailChange(event) {
      let warning = null,error = null;
      if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(event.target.value)){
          error ='Invalid e-mail structure!';
      }
      this.handleFieldChange('email',error,warning,event.target.value);
    }
    handlePasswordChange(event) {
      let error = null,warning = null;
      if(Config.registerPageRestrictions.passwordMinLength > event.target.value.length){
         error =  'at list '+Config.registerPageRestrictions.passwordMinLength+' symbols required!';
      } else if(Config.registerPageRestrictions.passwordCapital && !(/^.*[A-Z].*/).test(event.target.value)){
          error= 'At least 1 capital letter required!'
      } else if(Config.registerPageRestrictions.passwordOtherSymbol && !(/^.*[^a-zA-Z].*/).test(event.target.value)){
          error= 'At least 1 non-letter character required!'
      }

      if(event.target.value.length===0){
        error =null;
        warning=null;
      }
      this.setState({
          fields:{
            ...this.state.fields,
            password: event.target.value
          },
          errors:{
            ...this.state.errors,
            password:error,
            confirm:(event.target.value === this.state.fields.confirm?null:'Passwords do not match!')
          },
          warnings:{
            ...this.state.warnings,
            password:warning,
          }
        });
      //this.handleFieldChange('password',error,warning,event.target.value);
    }
    handleConfirmChange(event) {
      let error = null,warning = null;
      if(this.state.fields.password !== event.target.value){
        error = 'Passwords do not match!';
      }
      this.handleFieldChange('confirm',error,warning,event.target.value);
    }
    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    handleClickShowconfirm() {
        this.setState({
            showconfirm: !this.state.showconfirm
        });
    }

    conditionalRender(containerClasses, paperClasses, textFieldStyle_info, infoChip,bigScreen){
      let paperStyle=this.defaultPaperStyle(bigScreen,this.state.openedChipsCount);
      return(
        <div className={containerClasses} style={{overflowY:'auto',maxHeight:'100%',width:'100%'}}>
          <Paper className={paperClasses} style={paperStyle} elevation={1} >
            {this.chippedInputRender('login','Login','text',textFieldStyle_info, infoChip,this.handleLoginChange.bind(this))}
            {this.chippedInputRender('email','E-mail','email',textFieldStyle_info, infoChip,this.handleEmailChange.bind(this))}
            <FormControl
                  className={this.props.classes.textField}
                  margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input style={(this.state.errors.password || this.state.warnings.password)!=null?textFieldStyle_info:{}}
                  id="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.fields.password}
                  onChange={this.handlePasswordChange.bind(this)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword.bind(this)}
                        >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  />
                {this.infoChipRender('password',infoChip)}
            </FormControl>

            <FormControl
                  style={this.state.errors.confirm!=null?this.state.warnings.confirm!=null?textFieldStyle_info:{}:{}}
                  className={this.props.classes.textField}
                  margin="normal">
              <InputLabel htmlFor="confirm">Confirm password</InputLabel>
              <Input style={(this.state.errors.confirm|| this.state.warnings.confirm)!=null?textFieldStyle_info:{}}
                id="confirm"
                type={this.state.showconfirm ? 'text' : 'password'}
                value={this.state.fields.confirm}
                onChange={this.handleConfirmChange.bind(this)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowconfirm.bind(this)}
                      >
                      {this.state.showconfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                />
              {this.infoChipRender('confirm',infoChip)}
            </FormControl>
            {this.buttonsRender(true,false)}
          </Paper>
        </div>
      );
    }
}

export default (MainFields);
