import { connect } from 'react-redux';
import {
  getCurrentNetwork,
  getCurrentNetworkLoadingStatus,
  fetchCitybikNetwork,
} from '../../modules/citybik';
import NetworkComponent from './networkComponent';

const mapStateToProps = (state: any) => ({
  loadingStatus: getCurrentNetworkLoadingStatus(state),
  network: getCurrentNetwork(state),
});

export default connect(
  mapStateToProps,
  {
    fetchCitybikNetwork,
  },
)(NetworkComponent);
