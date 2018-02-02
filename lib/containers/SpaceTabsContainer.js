'use babel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import Tab from '../components/Tab';

class SpaceTabsContainer extends Component {
  state = SpaceTabsContainer.defaultState

  render() {
    const { dragName, x, y } = this.state;
    return (
      <div
        className='space-tabs-container'
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        ref={this.ref}
      >
        {this.props.items.map((editor) => (
          <Tab
            onMouseDown={this.onMouseDown}
            onClose={this.onTabClose}
            dragName={dragName}
            editor={editor}
            moveX={x}
            moveY={y}
          />
        ))}
      </div>
    );
  }

  onMouseDown = (x, y, dragName) => {
    this.setState({ dragName });
    this.dragStart = { x, y };
  }
  onMouseMove = ({ screenX, screenY }) => {
    if (!this.dragStart) return;
    this.setState({
      x: screenX - this.dragStart.x,
      y: screenY - this.dragStart.y
    });
  }
  onMouseUp = () => {
    this.dragStart = null;
    this.setState(SpaceTabsContainer.defaultState);
  }
  onTabClose = () => {
    
  }

  static defaultState = {
    dragName: null,
    x: 0,
    y: 0
  }

  static propTypes = {
    items: arrayOf(object).isRequired
  }
}

export default connect(
  (state) => ({}),
  {}
)(SpaceTabsContainer);
