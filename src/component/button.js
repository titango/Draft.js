import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ButtonToolbar extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <button className="button" onClick={this.props.clickAction}>{this.props.buttonDisplay}</button>
    )
  }
}

export default ButtonToolbar
