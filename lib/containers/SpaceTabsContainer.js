'use babel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';

class SpaceTabsContainer extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className='space-tabs-container'>
        {this.props.items.map((editor) => (
          <div className='btn-group'>
            <button className='btn'>{editor.getTitle()}</button>
            <button className='btn icon icon-remove-close' />
          </div>
        ))}
      </div>
    );
  }

  static propTypes = {
    items: arrayOf(object).isRequired
  }
}

export default connect((state) => ({}))(SpaceTabsContainer);
