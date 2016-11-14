import zipObject from 'lodash/zipObject';
import { bindActionCreators } from 'redux';

/**
 * Pass in a dict of dicts of actions, and then a dispatch function. Returns
 * the same dictionary but with action producing functions bound to the `dispatch`
 * function, so that components can dispatch actions to the redux store.
 */
export default function mapDispatchToProps (actions) {
  return (dispatch) => {
    const actionKeys = Object.keys(actions);
    const boundActionCreators = actionKeys.map(k => bindActionCreators(actions[k], dispatch));

    return {
      actions: zipObject(actionKeys, boundActionCreators)
    };
  };
}
