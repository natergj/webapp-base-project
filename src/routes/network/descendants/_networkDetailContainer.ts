import { connect } from 'react-redux';
import {
  getCurrentNetwork,
} from '../../../modules/citybik';

import NetworkDetailComponent from './_networkDetailComponent';

const mapStateToProps = (state: any) => {
  return {
    network: getCurrentNetwork(state),
  };
};

export default connect(
  mapStateToProps,
)(NetworkDetailComponent);
