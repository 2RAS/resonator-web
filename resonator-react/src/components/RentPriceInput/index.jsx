
import React from 'react';
import './styles.css'
import 'styles/positioning.css';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import SimpleDropdown  from 'components/SimpleDropdown';
class RentPriceInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showDetails:false
    }
  }
  onPeriodChanged(value){
    this.props.onChange({
      ...this.props.value,
      period:value
    })
  }
  onCurrencyChanged(value){
    this.props.onChange({
      ...this.props.value,
      currency:value
    })
  }
  onPriceChanged(evt){
    evt.preventDefault();

    let nextValue;
    if(/^[0-9]*$/.test(evt.target.value))
      nextValue=parseFloat(evt.target.value);
    else
      nextValue=this.props.value.price;
    this.props.onChange({
      ...this.props.value,
      price:nextValue,
    })
  }

  render(){
    let details;
    if(this.state.showDetails)
      details =(
      <span>
        <SimpleDropdown options={['acp','uah','usd','rub']} className='rentPrice-periodInput' styleButton={{paddingLeft:0,paddingRight:0}} value={this.props.value.currency} onChange={this.onCurrencyChanged.bind(this)}/>/
        <SimpleDropdown options={['hour','day','week']} className='rentPrice-periodInput' styleButton={{paddingLeft:0,paddingRight:0}} value={this.props.value.period} onChange={this.onPeriodChanged.bind(this)}/>
      </span>);
    else details=this.props.value.currency+'/'+this.props.value.period;
    return(
      <span className={'rentPrice '+this.props.className}  style={{...this.props.style}}>
        {this.props.name+': '}
          <Input type='text' className='rentPrice-priceInput' onChange={this.onPriceChanged.bind(this)} value={this.props.value.price?this.props.value.price:''}/>
          <span onMouseEnter={(()=>this.setState({showDetails:true})).bind(this)}
                onMouseLeave={(()=>this.setState({showDetails:false})).bind(this)}
                >
            {details}
          </span>
      </span>
    )
  }
}
RentPriceInput.propTypes = {
    value: PropTypes.shape({
    price: PropTypes.number,
    period: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,//onChange accepts the object of type value
}

export default RentPriceInput;
