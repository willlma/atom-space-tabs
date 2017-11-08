'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { tabs } from './reducers';
import SpaceTabsContainer from './containers/SpaceTabsContainer';
import { packageUri } from './constants';

export default class AtomSpaceTabsView {
  constructor(serializedState) {
    const initialState = serializedState;
    // const rootReducer = combineReducers(...reducers);
    this.store = createStore(tabs, initialState, applyMiddleware(thunk));
    // Create root element
    this.element = document.createElement('div');
    ReactDOM.render(
      <Provider store={this.store}>
        <SpaceTabsContainer items={atom.workspace.getTextEditors()} />
      </Provider>,
      this.element
    );
  }

  getTitle = () => 'sup';
  getUri = () => packageUri;

  // Returns an object that can be retrieved when package is activated
  // serialize() {
  //   return this.store;
  // }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }
}
