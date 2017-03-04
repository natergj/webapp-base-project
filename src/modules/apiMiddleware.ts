export const API_FETCH = '@@apiMiddleware/API_FETCH';

export const apiMiddleware = (store) => (next) => (action) => {
  next(action);

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
      next({ type: startActionType });
      window.fetch(url, data)
      .then((response: any) => {
        if (response.status === 200) {
          response.json()
          .then((data) => {
            next({ type: successActionType, payload: data });
          });
        } else {
          next({ type: errorActionType, payload: response });
        }
      })
      .catch((e) => {
        next({ type: uncaughtErrorActionType, payload: e });
      });
    } catch (e) {
      next({ type: uncaughtErrorActionType, payload: e });
    }
  }
};
