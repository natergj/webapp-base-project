import { SET_CURRENT_CITYBIK_NETWORK_LOADING_STATUS } from './_citybikConstants';
import { IAsyncAction } from '../../utils/asyncActions';

export function setCurrentCitybikNetworkLoadingStatus(asyncStatus: IAsyncAction) {
  return { type: SET_CURRENT_CITYBIK_NETWORK_LOADING_STATUS, payload: asyncStatus };
}
