import React from 'react'
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class ExtraFields extends React.Component {
    constructor(props) {
        super();
        this.state = {
            firstName : props.fields.firstName,
            secondName : props.fields.secondName,
            lastName : props.fields.lastName,
            errors: []
        }
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        });
    }
    handleSecondNameChange(event) {
        this.setState({
            secondName: event.target.value,
        });
    }
    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value,
        });
    }
    isEmpty(value) {
        return !value.trim();
    }

    render() {

        return (
            <Paper className={[this.props.classes.root, 'centered'].join(' ')} elevation={1}>
                <TextField
                    label="Name"
                    margin="normal"
                    value={this.state.firstName}
                    className={this.props.classes.textField}
                    onChange={this.handleFirstNameChange.bind(this)}
                />
                <TextField
                    label="SecondName"
                    margin="normal"
                    value={this.state.secondName}
                    className={this.props.classes.textField}
                    onChange={this.handleSecondNameChange.bind(this)}
                />
                <TextField
                    label="LastName"
                    margin="normal"
                    value={this.state.lastName}
                    className={this.props.classes.textField}
                    onChange={this.handleLastNameChange.bind(this)}
                />

                {this.state.errors.map((error, i) => {
                    return (<div className="error">{error}</div>);
                })}
                <div style={{ height: '2em' }} />{ /*used for scaling,for textBoxes not to take */}
                <Button variant="contained"
                    className={[this.props.classes.button, 'centered'].join(' ')}
                    onClick={this.prevStep.bind(this)}>
                    Back
                </Button>
                <Button variant="contained"
                    className={[this.props.classes.button, 'centered'].join(' ')}
                    onClick={this.submitForm.bind(this)}>
                    Submit
                </Button>
            </Paper>
        )
    }

    prevStep(){
        var data = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            lastName: this.state.lastName
        }

        this.props.saveValues(data);
        this.props.prevStep();
    }

    submitForm(e) {
        e.preventDefault();

        let errorsContainer = [];

        if (this.isEmpty(this.state.firstName) ||
            this.isEmpty(this.state.secondName) ||
            this.isEmpty(this.state.lastName)) {
            errorsContainer.push("Some fields are empty");
        }

        this.setState({
            errors: errorsContainer
        });

        if (errorsContainer.length === 0) {
            var data = {
                firstName: this.state.firstName,
                secondName: this.state.secondName,
                lastName: this.state.lastName
            }

            this.props.saveValues(data);
            this.props.sendValues();
        }
    }
}

ExtraFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (ExtraFields);
