
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import AdvertCard from 'components/AdvertCard'
import Media from 'react-media'

  class AdvertList extends React.Component{
    tonelArray(arr,n){
      let newArr =[];
      var smallArray=[];
      for(let i in arr){
        if((i%n) == (n-1)){
          smallArray.push(arr[i]);
          newArr.push(smallArray);
          smallArray=[];
        }
        else{
          smallArray.push(arr[i]);
        }
      }
      if((arr.length%n)!=0)newArr.push(smallArray);
      return newArr;
    }
    getRendenedList(arr){
      return arr.map((e)=>{
                       return (
                        <div className='advertList-sublist'>
                        {e.map((l)=>{
                          return (
                            <AdvertCard
                              style={{display:'inline-block',width:'100vw', margin:'15px'}}
                               key ={l.name}
                               data = {l}
                               history={this.props.history}>
                           </AdvertCard>
                          );
                        })}
                        </div>
                      )});
    }
    render(){
      let coupledAdverts = this.getRendenedList(this.tonelArray(this.props.adverts,2));
      return (
          <div style={this.props.style} className={['advertList',this.props.className].join(' ')}>
            {this.getRendenedList(this.tonelArray(this.props.adverts,this.props.rowCount?this.props.rowCount:1))}
          </div>
      );
    }
  }

    AdvertList.propTypes = {
      adverts: PropTypes.arrayOf(PropTypes.object) //.isRequired,
    };

    export default (AdvertList);
