import React from 'react'
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import DurationInput from '../../../components/DurationInput'
import ImageLoader from '../../../components/ImageLoader'
import {connect} from 'react-redux'

import './styles.css'
import 'styles/positioning.css'
import AdvertAPI from "../../../api/AdvertAPI";
import RentPriceInput from "../../../components/RentPriceInput";
import CategoryRow from 'containers/CategoryRow'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: '720px',
    },
    button: {
        margin: theme.spacing.unit,
        background: '#333333',
        color: 'white'
    },
    bottomPanel: {
        position: 'fixed',
        height: '20%',
        width: '100%',
        bottom: 0,
        left: 0,
        background: '#666666'
    },
    container: {
        background: 'blue'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        borderRadius: 0,
        color: 'red',
        width: '45%'
    },
    info:{
        width: '100%'
    },
    textfield: {
        color: 'red'
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    header: {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '10%',
        width: '100%',
        textAlign: 'center',
        verticalAlign: 'center',
        color: 'white',
        textShadow: `#000 0px 0px 0.5px,	 #000 0px 0px 0.5px,	 #000 0px 0px 0.5px,
								 #000 0px 0px 0.5px,	 #000 0px 0px 0.5px,	 #000 0px 0px 0.5px`,
    },
    palette: {
        primary: 'yellow',
        secondary: 'yellow',
        error: 'red',
        common: {
            darkBlack: 'yellow',
        }
    }
});

class CreateAdvert extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            min_duration: {},
            category: '',
            info: '',
            location: '',
            price:{
                price:undefined,
                period:'day',
                currency:'acp',
            },
            numb_of_hours: '',
            imageLinks:[],
            mainLink:'',
            errors: []
        }
        //if(this.props.keycloak.adapter)this.props.keycloak.login();
    }

    handleCheckLogin=()=>{
        if(this.props.kcInitialized)this.props.keycloak.login({});
    }

    /**Images**/
    handleAddImageLink(link){

        this.setState({
            imageLinks:this.state.imageLinks.concat([link]),
            mainLink:(this.state.mainLink===undefined?link:this.state.mainLink),
        });
    }
    handleChooseMainImageLink(link){
        this.setState({
            mainLink:link
        });
    }
    handleRemoveImageLink(link){
        var index = this.state.imageLinks.indexOf(link);
        if (index !== -1){
            this.state.imageLinks.splice(index, 1);
            if(link===this.state.mainLink){
                this.state.mainLink=this.state.imageLinks.length>0?this.state.imageLinks[0]:undefined;
            }
        }
        this.forceUpdate();
    }

    /**Duration input**/
    handleMinDurationChange(minTime){
        this.setState(
          {
            min_duration: minTime,
            numb_of_hours:this.toHours(minTime)
          })
          //,()=>alert(JSON.stringify(this.state.numb_of_hours)));


    }

    toHours(timePeriod) {
     return (timePeriod.weeks ? timePeriod.weeks*7*24 :0) +
            (timePeriod.days ? timePeriod.days*24 : 0)     +
            (timePeriod.hours ? timePeriod.hours : 0)       ;
    }

    /**Price input**/
    handlePriceChange(new_price) {
        this.setState({
            price: new_price,
        });
    }
    /**Name input**/
    handleNameChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    /**Category input**/
    handleCategoryChange(event) {
        this.setState({
            category: event.target.value,
        });
    }

    /**Info input**/
    handleInfoChange(event) {
        this.setState({
            info: event.target.value,
        });
    }

    /**Location input**/
    handleLocationChange(event) {
        this.setState({
            location: event.target.value,
        });
    }
    onCategoryUpdate(newCategory){
      this.setState({
        category:newCategory,
      })
    }


    isEmpty(value) {
        return !value.trim();
    }

    sendValues() {
        console.log("SEND ", this.state);
        if(this.props.keycloak.authenticated)
          this.props.keycloak.updateToken(30).success((()=>{
              let customState = {
                ...this.state,
                price:this.state.price.price,
                category:this.state.category?this.state.category[0]?this.state.category[0]:'':'',
                subcategory:this.state.category?this.state.category[1]?this.state.category[1]:'':''}
              AdvertAPI.createAdvert(customState,this.props.keycloak.token);
            })).error(function() {
              alert('Failed to refresh token');
            }
          );

        else if(this.props.kcInitialized)console.log('create advert failed. You should login first!');
        else console.log('wait for keycloak initialization...');
    }

    render() {

        var html = (
            <div className='fullScreen' style={{ background: '#444444' }}>
                <div className={this.props.classes.header}>
                    <h1>Advert</h1>
                </div>
                <Paper className={[this.props.classes.root, 'centered'].join(' ')} elevation={1}>
                    <TextField
                        required
                        label="Name"
                        margin="normal"
                        value={this.state.name}
                        className={this.props.classes.textField}
                        onChange={this.handleNameChange.bind(this)}
                    />
                    <TextField
                        required
                        label="Location"
                        margin="normal"
                        value={this.state.location}
                        className={this.props.classes.textField}
                        onChange={this.handleLocationChange.bind(this)}

                    />
                    <RentPriceInput name='Price' onChange={this.handlePriceChange.bind(this)} value={this.state.price}/>
                    <TextField
                        label="Info"
                        margin="normal"
                        value={this.state.info}
                        className={this.props.classes.info}
                        onChange={this.handleInfoChange.bind(this)}
                        multiline
                        rowsMax="4"
                    />
                    <DurationInput name='Minimum duration rent' value={this.state.min_duration} onChange={this.handleMinDurationChange.bind(this)}/>
                    <ImageLoader classNameClosed='pictureUploadTest-imageLoaderСlosed'
                                 classNameOpened='pictureUploadTest-imageLoaderOpened'
                                 className='pictureUploadTest-imageLoader'
                                 imageLinks={this.state.imageLinks}
                                 chosenLink={this.state.mainLink}
                                 onUploaded={this.handleAddImageLink.bind(this)}
                                 onRemoved={this.handleRemoveImageLink.bind(this)}
                                 onChosen={this.handleChooseMainImageLink.bind(this)}>
                    </ImageLoader>
                    {this.state.errors.map((error, i) => {
                        return (<div className="error">{error}</div>);
                    })}
                    <CategoryRow value = {this.state.category}
                                   onCategoryUpdate={this.onCategoryUpdate.bind(this)}
                                   className='createAdvert-categoryRow'/>
                    <div style={{ height: '2em' }} />{ /*used for scaling,for textBoxes not to take */}
                    <Button variant="contained"
                            className={[this.props.classes.button, 'centered'].join(' ')}
                            onClick={this.submit.bind(this)}>
                        Submit
                    </Button>
                </Paper>
            </div>
        );
        return <div>{html}</div>;
    }


    submit() {
        let errorsContainer = [];

        if (this.isEmpty(this.state.name) ||
            this.isEmpty(this.state.location) ||
            this.state.price.price === undefined) {
            errorsContainer.push("Some fields are empty");
        }

        this.setState({
            errors: errorsContainer
        });

        if (errorsContainer.length === 0) {
            this.sendValues();
        }
    }

}
const mapStateToProps = (state)=>{
  return {
    keycloak:state.security.keycloak,
    kcAuthenticated:state.security.authenticated,
    kcInitialized:state.security.initialized
  }
}

export default connect(mapStateToProps) (withStyles(styles)(CreateAdvert));
