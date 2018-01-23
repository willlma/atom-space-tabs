'use babel';

import React, { Component } from 'react';
import { number, string, func, shape } from 'prop-types';

export default class Tab extends Component {
  state = { left: 0, top: 0 }

  componentDidMount() {
    const rect = this.btn.getBoundingClientRect();
    this.state = {
      left: rect.left,
      top: rect.top,
    };
  }

  componentWillReceiveProps(props) {
    const { dragName, editor, x, y } = this.props;
    if (dragName !== editor.getTitle() || props.dragName) return;
    const { left, top } = this.state;
    this.setState({
      left: left + x,
      top: top + y
    });
  }

  componentShouldUpdate(props, state) {
    const { dragName, editor, x, y } = this.props;
    const { left, top } = this.state;
    console.log(`x: ${x}`);
    console.log(`left: ${left}`);
    if (
      dragName !== editor.getTitle() ||
      (state.left === left && state.top === top)
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div
        className='btn-group'
        ref={this.ref}
        style={this.getStyle()}
      >
        <button className='btn'>{this.props.editor.getTitle()}</button>
        <button className='btn icon icon-remove-close' />
      </div>
    );
  }

  ref = (btn) => { this.btn = btn; }

  getStyle = () => {
    const { left, top } = this.state;
    const { x, y } = this.props;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translate3d(${left + x}px, ${top + y}px, 0)`
    };
  };

  static propTypes = {
    dragName: string.isRequired,
    editor: shape({ getTitle: func }).isRequired,
    x: number.isRequired,
    y: number.isRequired
  }
}
