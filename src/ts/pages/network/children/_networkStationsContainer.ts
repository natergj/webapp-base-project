import { connect } from 'react-redux';
import {
  getCurrentNetwork,
} from '../../../modules/citybik';

import NetworkStationsComponent from './_networkStationsComponent';

const mapStateToProps = (state: any) => {
  return {
    network: getCurrentNetwork(state),
  };
};

export default connect(
  mapStateToProps,
)(NetworkStationsComponent);
