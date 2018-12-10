
import React from 'react';
import './styles.css'
import 'styles/positioning.css';
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
class DurationInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showDetails:false,
    }
    this.props.onChange({
      ...this.props.value,
      weeks:this.getNumber(this.props.value.weeks),
      days:this.getNumber(this.props.value.days),
      hours:this.getNumber(this.props.value.hours),
    })
  }
  getNumber(string){
    if(/^[0-9]*$/.test(string))
     return parseInt(string);
    else
      return undefined;
  }
  onWeeksChanged(evt){
    evt.preventDefault();
    if(evt.target.value===''){
      this.props.onChange({
        ...this.props.value,
        weeks:undefined
      });
    }
    let x = this.getNumber(evt.target.value);
    if(x){
      this.props.onChange({
        ...this.props.value,
        weeks:x
      });
    }
  }
  onDaysChanged(evt){
    evt.preventDefault();
    if(evt.target.value===''){
      this.props.onChange({
        ...this.props.value,
        days:undefined
      });
    }
    let x = this.getNumber(evt.target.value);
    if(x){
      this.props.onChange({
        ...this.props.value,
        days:x
      });
    }
  }
  onHoursChanged(evt){
    evt.preventDefault();
    if(evt.target.value===''){
      this.props.onChange({
        ...this.props.value,
        hours:undefined
      });
    }
    let x = this.getNumber(evt.target.value);
    if(x){
      this.props.onChange({
        ...this.props.value,
        hours:x
      });
    }
  }
  render(){
    let details;
    if(this.state.showDetails)
      details =(
      <span>
        weeks:<Input type='text' className='durationInput-input'  value={this.props.value.weeks} onChange={this.onWeeksChanged.bind(this)}/>
      days:<Input type='text' className='durationInput-input'  value={this.props.value.days} onChange={this.onDaysChanged.bind(this)}/>
    hours:<Input type='text' className='durationInput-input'  value={this.props.value.hours} onChange={this.onHoursChanged.bind(this)}/>
      </span>);
    else details=(this.props.value.weeks?(this.props.value.weeks+' weeks '):'')+
      (this.props.value.days?(this.props.value.days+' days, '):'')+
      (this.props.value.hours?(this.props.value.hours+'hours'):'');
      if(details==='')details='select';
    return(
      <span className={'rentPrice '+this.props.className}  style={{...this.props.style}}
        onMouseEnter={(()=>this.setState({showDetails:true}))} onMouseLeave={(()=>this.setState({showDetails:false}))}>
        {this.props.name+': '}
          <span >
            {details}
          </span>
      </span>
    )
  }
}

DurationInput.propTypes = {
    value: PropTypes.shape({
      weeks: PropTypes.number,
      days: PropTypes.number,
      hours: PropTypes.number,
      }).isRequired,
    onChange: PropTypes.func.isRequired,//onChange accepts the object of type value
}
export default DurationInput;
