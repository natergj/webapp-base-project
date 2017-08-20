export const API_FETCH = '@@apiMiddleware/API_FETCH';

export const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action.type === API_FETCH) {
    const {
      url,
      data = {},
      startActionType,
      successActionType,
      errorActionType,
      uncaughtErrorActionType,
    } = action.payload;

    try {
      dispatch({ type: startActionType });
      window.fetch(url, data)
      .then((response: any) => {
        if (response.status === 200) {
          response.json()
          .then((data) => {
            dispatch({ type: successActionType, payload: data });
          });
        } else {
          dispatch({ type: errorActionType, payload: response });
        }
      })
      .catch((e) => {
        dispatch({ type: uncaughtErrorActionType, payload: e });
      });
    } catch (e) {
      dispatch({ type: uncaughtErrorActionType, payload: e });
    }
  }
  return next(action);
};
