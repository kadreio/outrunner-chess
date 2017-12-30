export default function loggerMiddleware(store) {
  return next => action => {
    console.log(action, store.getState());
    try {
      return next(action);
    } catch (e) {
      console.error(e);
    }
  };
}
