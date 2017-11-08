'use babel';

import { CompositeDisposable, Disposable } from 'atom';
import AtomSpaceTabsView from './AtomSpaceTabsView';
import { packageUri } from './constants';

export default {

  atomSpaceTabsView: null,
  modalPanel: null,
  subscriptions: null,

  activate({ atomSpaceTabsViewState }) {
    atom.workspace.addOpener(
      (uri) => uri === packageUri && new AtomSpaceTabsView(atomSpaceTabsViewState)
    );
    Disposable(() => {
      atom.workspace.getPaneItems().forEach((pane) => {
        if (pane instanceof AtomSpaceTabsView) pane.destroy();
      });
    });
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-space-tabs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    console.log('Atom Space Tabs was toggled');
    atom.workspace.toggle(packageUri);
  }

};
