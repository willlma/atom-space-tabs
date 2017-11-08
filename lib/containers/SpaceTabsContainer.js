'use babel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import Tab from '../components/Tab';

class SpaceTabsContainer extends Component {
  constructor() {
    super();
    this.state = SpaceTabsContainer.defaultState;
  }

  render() {
    const { dragName, x, y } = this.state;
    return (
      <div
        className='space-tabs-container'
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        {this.props.items.map((editor) => (
          <Tab dragName={dragName} editor={editor} x={x} y={y} />
        ))}
      </div>
    );
  }

  onMouseDown = (evt) => {
    this.screenX = evt.screenX;
    this.screenY = evt.screenY;
    this.setState({
      // TODO: this assumes knowledge of the implementation of Tab. Change
      dragName: evt.currentTarget.value
    });
  }
  onMouseMove = (evt) => {
    if (!this.screenX) return;
    this.setState({
      x: evt.screenX - this.screenX,
      y: evt.screenY - this.screenY
    });
  }
  onMouseUp = () => {
    this.screenX = null;
    this.screenY = null;
    this.setState(this.defaultState);
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
