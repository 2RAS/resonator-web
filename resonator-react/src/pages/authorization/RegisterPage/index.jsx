import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from "react-responsive";


import 'styles/positioning.css';
import MainFields from './MainFields';
import MinFields from './MinFields';
import UserAPI from 'api/UserAPI.jsx';
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: '32em',
    },
    button: {
        margin: theme.spacing.unit,
        background: '#333333',
        color: 'white'
    },
    container: {
        background: 'blue'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        borderRadius: 0,
        color: 'red',
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



class RegisterPage extends React.Component {

    constructor() {
        super();
        this.fields ={
            login: 'SubzeroDesk1873',
            email: 'some@gmail.com',
            password: 'otherPass1',
            confirm: 'otherPass1',
            firstName: '',
            secondName: '',
            lastName: ''
        }
        this.state = {
            step: 1
        }
    }
    componentDidMount() {

    }
    saveValues(field_value) {
        return function () {
            for (let i in field_value) {
               this.fields[i] = field_value[i];
            }
        }.bind(this)()
    }

    sendValues() {
        UserAPI.tryRegister(this.fields);
    }

    nextStep() {
        this.setState({
            step: this.state.step + 1,
        });
    }
    prevStep() {
        this.setState({
            step: this.state.step - 1,
        });
    }
    content() {
        switch (this.state.step) {
            case 1:
                return <MainFields
                    fields={this.fields}
                    nextStep={this.nextStep.bind(this)}
                    saveValues={this.saveValues.bind(this)}
                    classes={this.props.classes} />;
            case 2:
                return <MinFields
                    fields={this.fields}
                    prevStep={this.prevStep.bind(this)}
                    saveValues={this.saveValues.bind(this)}
                    nextStep={this.sendValues.bind(this)}
                    classes={this.props.classes} />;
           default:
              return 'Error step state';
        }
    }

    render() {
        var html = (
            <div className='fullScreen' style={{background: '#444444' }}>
              <MediaQuery query='(min-height:35em)'>
                <div className={this.props.classes.header}>
                    <h1>Registration</h1>
                </div>
              </MediaQuery>
                {this.content()}
            </div>
        );
        return <div>{html}</div>;
      }

};

RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);
