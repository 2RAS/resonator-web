import React from 'react'
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MediaQuery from 'react-responsive'
import InfoChip from 'components/InfoChip'

import 'styles/positioning.css'
class RegisterPart extends React.Component {
    constructor(props) {
        super();
        this.state = {
            fields:{
              //for each field with default value
            },
            errors: {
              //for each field()
            },
            warnings: {
              //for each field()
            },
            isChipMinimized:{
              //for each chip(field)
            },
            openedChipsCount:0
        }
      }

    handleFieldChange(fieldName,error,warning,value){
      if(value.length===0){
        error =null;
        warning=null;
      }
      this.setState({
          fields:{
            ...this.state.fields,
            [fieldName]: value,
          },
          errors:{
            ...this.state.errors,
            [fieldName]:error
          },
          warnings:{
            ...this.state.warnings,
            [fieldName]:warning,
          }
        });
    }
    isEmpty(value) {
        return !value.trim();
    }
    getHandleInfoChipMaximize(inputName){
      return (()=>{
        if(this.state.isChipMinimized[inputName]){
          this.setState({
            openedChipsCount:(this.state.openedChipsCount+1),
            isChipMinimized:{
              ...this.state.isChipMinimized,
              [inputName]:false
            }});
        }
      });
    }
    getHandleInfoChipMinimize(inputName){
      return (()=>{
        if(!this.state.isChipMinimized[inputName]){
          this.setState({
            openedChipsCount:this.state.openedChipsCount-1,
            isChipMinimized:{
              ...this.state.isChipMinimized,
              [inputName]:true
            }});
        }
        });
    }

    infoChipRender(inputName,data){
      var jsx;
      if(this.state.errors[inputName]!=null){
        jsx=<InfoChip minimized={data.alert || this.state.isChipMinimized[inputName]} type='error' squared={data.squared}
                  showAlert={data.alert} info={this.state.errors[inputName]}
                  size='2.8em' style={data.style} fullWidth='calc(100vw - 100% - 7em)'
                  onMaximize={this.getHandleInfoChipMaximize.bind(this)(inputName)}
                  onMinimize={this.getHandleInfoChipMinimize.bind(this)(inputName)}/>
      }else if(this.state.warnings[inputName]!=null){
        jsx=<InfoChip minimized={data.alert || this.state.isChipMinimized[inputName]} type='warning' squared={data.squared}
                  showAlert={data.alert} info={this.state.warnings[inputName]}
                  size='2.8em' style={data.style} fullWidth='calc(100vw - 100% - 7em)'
                  onMaximize={this.getHandleInfoChipMaximize.bind(this)(inputName)}
                  onMinimize={this.getHandleInfoChipMinimize.bind(this)(inputName)}/>
      }else{
        if(this.state.isChipMinimized[inputName]===false){
          this.setState({
            openedChipsCount:this.state.openedChipsCount-1,
            isChipMinimized:{
              ...this.state.isChipMinimized,
              [inputName]:true
            }
          })
        }
        jsx=null;
      }
      return jsx;
    }
    chippedInputRender(fieldName, caption, type, inputStyle_chipped,chipData,onChange){
      return(
        <FormControl
            className={this.props.classes.textField}
            margin="normal">
            <InputLabel htmlFor={fieldName}>{caption}</InputLabel>
              <Input style={(this.state.errors[fieldName] || this.state.warnings[fieldName])!=null?inputStyle_chipped:{}}
                id={fieldName}
                ref={fieldName}
                type={type}
                value={this.state.fields[fieldName]}
                onChange={onChange}
                />
              {this.infoChipRender(fieldName,chipData)}
            </FormControl>
          );
    }
    buttonsRender(isFirst,isLast){
      let spacing = <div style={{ height: '2em' }} />;
      let continueButton = (
            <Button variant="contained"
              className={[this.props.classes.button].join(' ')}
              onClick={this.nextStep.bind(this)}>
              Continue
            </Button>
          );
      let backButton = (
          <Button variant="contained"
              className={[this.props.classes.button].join(' ')}
              onClick={this.prevStep.bind(this)}>
              Back
          </Button>
        );
        let submitButton = (
          <Button variant="contained"
              className={[this.props.classes.button].join(' ')}
              onClick={this.nextStep.bind(this)}>
              Submit
          </Button>
        );
      return (
        <div className='centered' style={{height:'2em'}}>
          {spacing}
          {isFirst?null:backButton}
          {isLast?submitButton:continueButton}
        </div>
      );
    }
    defaultPaperStyle(bigScreen,openedChipsCount){
      return (bigScreen && (openedChipsCount!==0))?{left:0,transform:'translate(0, 0)'}:{};
    }
    conditionalRender(containerClasses, paperClasses, textFieldStyle_info, infoChip,bigScreen){
      let paperStyle=this.defaultPaperStyle(bigScreen,this.state.openedChipsCount);
      return(
        <div className={containerClasses} style={{overflow:'visible',overflowY:'auto',maxHeight:'100%',width:'100%'}}>
          <Paper className={paperClasses} style={paperStyle} elevation={1} >
              {this.chippedInputRender('login','Login','text',textFieldStyle_info, infoChip)}
              {this.chippedInputRender('email','E-mail','email',textFieldStyle_info, infoChip)}
                  <FormControl
                    className={this.props.classes.textField}
                    margin="normal">
                    <InputLabel htmlFor="emailInput">E-mail</InputLabel>
                    <Input style={(this.state.errors.email || this.state.warnings.email)!=null?textFieldStyle_info:{}}
                      id="emailInput"
                      ref='email'
                      type='email'
                      value={this.state.email}
                      onChange={this.handleEmailChange.bind(this)}
                      />
                    {this.infoChipRender('email',infoChip)}
                  </FormControl>
                  <FormControl
                    className={this.props.classes.textField}
                    margin="normal">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input style={(this.state.errors.password || this.state.warnings.password)!=null?textFieldStyle_info:{}}
                      id="password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
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
                          value={this.state.confirm}
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
                      buttonsRender(true,true);
                      </Paper>
                    </div>
      );
    }
    render() {
        let paperClasses = [this.props.classes.root,'centeredX'].join(' ');
        let containerClasses ='centeredY';
        return (
          <div className='fullScreen'>
              <MediaQuery query='(min-width:calc(50em + 0.1px)'>
                {this.conditionalRender.bind(this)(containerClasses, paperClasses,{}, {squared:false, alert:false,style:{position:'absolute',left:'calc(105% + 5px)'}},true)
                }
              </MediaQuery>
              <MediaQuery query='(max-width:50em)'>
                {
                   this.conditionalRender.bind(this)(containerClasses,paperClasses,{width:'calc(100% - 3em - 10px)'}, {squared:true,alert:true,style:{position:'absolute',right:'0px'}},false)
                }
              </MediaQuery>
          </div>
        )
    }

    validateLocal(){
      let errState=false;
      for(let i in this.state.fields){
        if(this.state.errors[i]!=null){
          alert("Fill all the fields!");
          return true;
        }
      }
      if(!errState)
        for(let i in this.state.errors){
          if(this.state.errors[i]!=null){
            alert("Fix all the errors!");
            return true;
          }
        }
      return false;
    }
    validate(){
      return this.validateLocal();
    }
    nextStep(e) {
        e.preventDefault();

        let errState=this.validate();

        if (!errState) {
            this.props.saveValues(this.state.fields);
            if(this.props.nextStep)this.props.nextStep();
            else alert('Sorry, it looks like developers failed in creating this form!')
        }
    }
    prevStep(e) {
        e.preventDefault();
        var data = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            lastName: this.state.lastName
        }
        this.props.saveValues(data);
        if(this.props.prevStep)this.props.prevStep();
        else alert('There is no turning back!')
    }
}

RegisterPart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (RegisterPart);
