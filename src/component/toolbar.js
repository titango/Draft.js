import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ButtonToolbar from './button';
import {RichUtils} from 'draft-js';

class ToolBar extends Component {

  constructor(props){
    super(props);
  }

  _onBoldClick() {
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'));
  }

  _onItalicClick(){
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'ITALIC'));
  }

  _onUnderlineClick(){
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'UNDERLINE'));
  }

  render(){
    return(
      <div className="toolbar">
        <ButtonToolbar
          name="BOLD"
          clickAction = {this._onBoldClick.bind(this)}
          buttonDisplay = {[<b>B</b>]} />
        <ButtonToolbar
          name="ITALIC"
          clickAction = {this._onItalicClick.bind(this)}
          buttonDisplay = {[<i>I</i>]} />
        <ButtonToolbar
          name="UNDERLINE"
          clickAction = {this._onUnderlineClick.bind(this)}
          buttonDisplay = {[<u>U</u>]} />
      </div>
    )

  }

}

export default ToolBar
