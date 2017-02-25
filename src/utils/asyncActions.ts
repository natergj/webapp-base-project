export type IAsyncAction = null | 'NOT_STARTED' | 'LOADING' | 'ERROR' | 'DONE';

// Selectors

export function isStarted(asyncAction: IAsyncAction) {
  return asyncAction !== 'NOT_STARTED' && asyncAction !== null;
}

export function isLoading(asyncAction: IAsyncAction) {
  return asyncAction === 'LOADING';
}

export function isError(asyncAction: IAsyncAction) {
  return asyncAction === 'ERROR';
}

export function isDone(asyncAction: IAsyncAction) {
  return asyncAction === 'DONE';
}
