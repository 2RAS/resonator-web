import React from 'react'
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import 'styles/positioning.css'

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

class LoginPage extends React.Component {

    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            showPassword: false,
            errors: []
        }
    }

    handleLoginChange(event) {
        this.setState({
            login: event.target.value,
        });
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }
    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    isEmpty(value) {
        return !value.trim();
    }

    sendValues() {
        console.log("SEND ", this.state);
    }

    render() {

        var html = (
            <div className='fullScreen' style={{ background: '#444444' }}>
                <div className={this.props.classes.header}>
                    <h1>Login</h1>
                </div>
                <Paper className={[this.props.classes.root, 'centered'].join(' ')} elevation={1}>
                    <TextField
                        label="Login"
                        margin="normal"
                        value={this.state.login}
                        className={this.props.classes.textField}
                        onChange={this.handleLoginChange.bind(this)}
                    />
                    <FormControl
                        className={this.props.classes.textField}
                        margin="normal">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
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
                    </FormControl>

                    {this.state.errors.map((error, i) => {
                        return (<div className="error">{error}</div>);
                    })}

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

        if (this.isEmpty(this.state.login) ||
            this.isEmpty(this.state.password)) {
            errorsContainer.push("Some fields are empty");
        }

        this.setState({
            errors: errorsContainer
        });

        if (errorsContainer.length === 0) {
            this.sendValues();
        }
    }
};

export default withStyles(styles)(LoginPage);
