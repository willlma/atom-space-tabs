'use babel';

import React, { Component } from 'react';
import { number, string, func, shape } from 'prop-types';

export default class Tab extends Component {
  position = { x: 0, y: 0 }

  shouldComponentUpdate(props) {
    const { dragName, editor, moveX, moveY } = this.props;
    const title = editor.getTitle();
    if (!props.dragName && dragName === title) {
      this.position.x += moveX;
      this.position.y += moveY;
    }
    if (
      dragName !== title ||
      (props.moveX === moveX && props.moveY === moveY)
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div
        className='btn-group'
        onMouseDown={this.onMouseDown}
        ref={this.ref}
        style={this.getStyle()}
      >
        <button className='btn' onClick={this.tabClick}>
          {this.props.editor.getTitle()}
        </button>
        <button className='btn icon icon-remove-close' onClick={this.closeClick} />
      </div>
    );
  }

  onMouseDown = (evt) => {
    const { editor, onMouseDown } = this.props;
    onMouseDown(evt.screenX, evt.screenY, editor.getTitle());
  }

  getStyle = () => {
    const { moveX, moveY } = this.props;
    const { x, y } = this.position;
    return {
      position: 'relative',
      transform: `translate3d(${x + moveX}px, ${y + moveY}px, 0)`
    };
  };

  tabClick = () => {
    atom.workspace.getActivePane().activateItem(this.props.editor);
  }

  closeClick = () => {
    atom.workspace.getActivePane().destroyItem(this.props.editor);
  }

  static propTypes = {
    dragName: string.isRequired,
    editor: shape({ getTitle: func }).isRequired,
    onMouseDown: func.isRequired,
    moveX: number.isRequired,
    moveY: number.isRequired
  }
}
