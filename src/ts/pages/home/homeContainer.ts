import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getCitybikNetworks,
  fetchCitybikNetworks,
  goToCitybikNetwork,
} from '../../modules/citybik';
import HomeComponent from './homeComponent';

const mapStateToProps = (state: any) => ({
  networks: getCitybikNetworks(state),
});
export default connect(
  mapStateToProps,
  {
    fetchCitybikNetworks,
    goToCitybikNetwork,
  },
)(withRouter(HomeComponent));
