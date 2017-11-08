'use babel';

import ActionTypes from './actionTypes';

export function tabs(state = [], action) {
  switch (action.type) {
    case ActionTypes.tabs:
      return action.tabs;
    default:
      return state;
  }
}
