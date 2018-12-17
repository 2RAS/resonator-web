
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 300,
  },
};

class SimpleSlider extends React.Component {
  state = {
    value: this.props.value,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onChangeVolume(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root} style={this.props.style}>
        <Typography id="label">{this.props.label}</Typography>
        <Slider value={value} aria-labelledby="label" max ={1} min ={0}  onChange={this.handleChange} />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
