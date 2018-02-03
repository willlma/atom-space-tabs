'use babel';

import React, { Component } from 'react';
import { number, string, func, shape } from 'prop-types';

export default class Tab extends Component {
  position = { x: 0, y: 0 }

  shouldComponentUpdate(props) {
    const { dragName, paneItem, moveX, moveY } = this.props;
    const title = paneItem.getTitle();
    // Done dragging
    if (!props.dragName && dragName === title) {
      this.position.x += moveX;
      this.position.y += moveY;
      this.didMove = Math.abs(moveX) > 1 || Math.abs(moveY) > 1;
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
          {this.props.paneItem.getTitle()}
        </button>
        <button className='btn icon icon-remove-close' onClick={this.closeClick} />
      </div>
    );
  }

  onMouseDown = (evt) => {
    const { paneItem, onMouseDown } = this.props;
    onMouseDown(evt.screenX, evt.screenY, paneItem.getTitle());
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
    if (!this.didMove) {
      atom.workspace.getActivePane().activateItem(this.props.paneItem);
    }
  }

  closeClick = () => {
    const { onTabClose, paneItem } = this.props;
    onTabClose(paneItem);
  }

  static propTypes = {
    dragName: string.isRequired,
    paneItem: shape({ getTitle: func }).isRequired,
    onMouseDown: func.isRequired,
    onTabClose: func.isRequired,
    moveX: number.isRequired,
    moveY: number.isRequired
  }
}
