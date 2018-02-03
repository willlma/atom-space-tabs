'use babel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import Tab from '../components/Tab';

class SpaceTabsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paneItems: props.paneItems,
      ...SpaceTabsContainer.defaultState
    };
  }

  render() {
    const { dragName, x, y } = this.state;
    return (
      <div
        className='space-tabs-container'
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        ref={this.ref}
      >
        {this.state.paneItems.map((paneItem) => (
          <Tab
            onMouseDown={this.onMouseDown}
            onClose={this.onTabClose}
            dragName={dragName}
            onTabClose={this.onTabClose}
            paneItem={paneItem}
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
  onTabClose = (paneItem) => {
    atom.workspace.getActivePane().destroyItem(paneItem);
    this.setState({
      paneItems: this.state.paneItems.filter((item) => item !== paneItem)
    });
  }

  static defaultState = {
    dragName: null,
    x: 0,
    y: 0
  }

  static propTypes = {
    paneItems: arrayOf(object).isRequired
  }
}

export default connect(
  (state) => ({}),
  {}
)(SpaceTabsContainer);
