import zipObject from 'lodash/zipObject';
import { bindActionCreators } from 'redux';

export default function mapDispatchToProps (actions) {
  return (dispatch) => {
    const actionKeys = Object.keys(actions);
    const boundActionCreators = actionKeys.map(k => bindActionCreators(actions[k], dispatch));

    return {
      actions: zipObject(actionKeys, boundActionCreators)
    };
  };
}
