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
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        ref={this.ref}
      >
        {this.props.items.map((editor) => (
          <Tab
            onMouseDown={this.onMouseDown}
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
    console.log('move');
    const x = screenX - this.dragStart.x;
    const y = screenY - this.dragStart.y;
    console.log(`x: ${x}`);
    console.log(`y: ${y}`);
    this.setState({
      x: screenX - this.dragStart.x,
      y: screenY - this.dragStart.y
    });
  }
  onMouseUp = () => {
    console.log('on mouse up');
    this.dragStart = null;
    this.setState(SpaceTabsContainer.defaultState, () => {
      console.log(`this.state.dragName: ${this.state.dragName}`);
    });
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
