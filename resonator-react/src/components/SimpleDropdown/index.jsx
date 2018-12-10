import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleDropdown extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSelect(option){
    this.setState({ anchorEl: null });
    this.props.onChange(option);
  };

  render() {
    const { anchorEl } = this.state;
    let menuItems = this.props.options.map((option)=><MenuItem key={option} onClick={(()=>this.handleSelect(option)).bind(this)}>{option}</MenuItem>);
    return (
      <div className={this.props.className}>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={this.props.classNameButton}
          style={this.props.styleButton}
        >
          {this.props.value?this.props.value:'select'}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}
// PropTypes: {options: ['one','two','three'], onSelect:(option)=>....}
export default SimpleDropdown;
